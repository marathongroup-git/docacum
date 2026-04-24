---
id: override-release-arinvoice
title: Override de **Release** en ARInvoiceEntry con validaciones previas
slug: /acumatica/override-release-arinvoice
sidebar_position: 10
description: Intercepta el Release nativo de ARInvoiceEntry con PXOverride para validar comisiones, fecha y tipo de cambio antes de liberar.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Override de `Release` en ARInvoiceEntry con validaciones previas

Este ejemplo muestra cómo **interceptar** el botón nativo **Release** en `ARInvoiceEntry` usando **`[PXOverride]`**, ejecutar validaciones **antes** del proceso de liberación y, si el usuario lo acepta, **registrar observaciones** en un campo extendido.

:::tip Objetivo
Evitar que el documento se libere si:
1) faltan datos de comisiones,  
2) la **fecha del documento** difiere de la **BusinessDate**,  
3) el **tipo de cambio** no es el esperado (con confirmación del usuario).
:::

## Requisitos previos

- Un campo extendido para observaciones (p. ej. `UsrObservaciones` en `ARRegisterExt` o `ARInvoiceExt`).
- Clase utilitaria `ValidationSOInvoice` con:
  - `CamposComisiones(ARRegisterExt ext)`
  - `EvaluarTipodeCambio(ARRegister doc)`
  - `ObetnerTipoCambioFactura(ARRegister doc, bool delDia, bool deLaFactura)` _(sic: si tu método se llama así con typo, úsalo tal cual o crea un wrapper)_
- Helpers `QuerySQL.Vendedor(...)` / `QuerySQL.ARTran(...)` (puedes reemplazarlos por `SelectFrom<>`).

:::caution Campo de Observaciones
El ejemplo **detecta en tiempo de ejecución** cómo se llama el campo (`UsrObservaciones`, `Usrobservaciones`, etc.) para no fallar en compilación.  
Si conoces exactamente el nombre y DAC, **prefiere** `SetValueExt<TField>` tipado.
:::

## Flujo

1. **Interceptar** el Release nativo con `[PXOverride]`.
2. **Salir temprano** si no hay documento o el `DocType` no es `Invoice`.
3. **Validación de comisiones**: `CamposComisiones(...)` debe lanzar excepción si algo no cuadra.
4. **Validación de fecha**: si `DocDate != BusinessDate`, preguntar con `Ask(Yes/No)`.  
   - **No** → `PXException` (no libera).  
   - **Sí** → continuar.
5. **Validación de tipo de cambio**: si `EvaluarTipodeCambio(doc)` es **false**, preguntar con `Ask(Yes/No)`.  
   - **No** → `PXException` (no libera).  
   - **Sí** → guardar **observaciones** y persistir.
6. **Liberar**: llamar a `baseMethod(adapter)`.

## Código completo

```csharp
using PX.Data;
using PX.Objects.AR;
using System.Collections;

public class ARInvoiceEntryExt : PXGraphExtension<ARInvoiceEntry>
{
    public delegate IEnumerable ReleaseDelegate(PXAdapter adapter);

    // IMPORTANTE: NO pongas PXUIField / PXProcessButton en un PXOverride
    [PXOverride]
    public IEnumerable Release(PXAdapter adapter, ReleaseDelegate baseMethod)
    {
        var doc = Base.Document.Current;
        if (doc == null)
            return baseMethod(adapter);

        // Solo facturas
        if (doc.DocType != ARDocType.Invoice)
            return baseMethod(adapter);

        // 1) Validación de comisiones
        var regExt = PXCache<ARRegister>.GetExtension<ARRegisterExt>(doc);
        ValidationSOInvoice.CamposComisiones(regExt);

        // 2) Validación de fecha
        if (doc.DocDate != Base.Accessinfo.BusinessDate)
        {
            var answer = Base.Document.Ask(
                ActionsMessages.Warning,
                Errores.fechaincorrecta,
                MessageButtons.YesNo,
                MessageIcon.Warning
            );

            if (answer == WebDialogResult.No)
                throw new PXException($"Liberación cancelada por petición del usuario: {GetSalespersonCD(doc)}. Favor de revisar el documento antes de liberar");
        }

        // 3) Validación de tipo de cambio
        if (!ValidationSOInvoice.EvaluarTipodeCambio(doc))
        {
            var answer = Base.Document.Ask(
                ActionsMessages.Warning,
                Errores.errortipocambiofactura,
                MessageButtons.YesNo,
                MessageIcon.Warning
            );

            if (answer == WebDialogResult.No)
                throw new PXException($"Liberación cancelada por petición del usuario: {GetSalespersonCD(doc)}. Favor de revisar el documento antes de liberar");

            // Usuario aceptó: registra observaciones ANTES de liberar
            var mensaje =
                $"Proceso aceptado por el usuario: {GetSalespersonCD(doc)} " +
                $"Tipo de cambio del día= {ValidationSOInvoice.ObetnerTipoCambioFactura(doc, true, false)} " +
                $"tipo de cambio de la factura= {ValidationSOInvoice.ObetnerTipoCambioFactura(doc, false, true)}";

            PXTrace.WriteInformation(mensaje);

            // Detecta el nombre correcto del campo en el cache y asigna
            var cache = Base.Document.Cache;
            string fieldName = null;

            // Lista de posibles nombres (ajusta/añade si usaste otro)
            string[] candidates = new[] { "UsrObservaciones", "Usrobservaciones", "usrObservaciones" };

            foreach (var c in candidates)
            {
                if (cache.Fields.Contains(c))
                {
                    fieldName = c;
                    break;
                }
            }

            if (fieldName != null)
            {
                cache.SetValueExt(doc, fieldName, mensaje);
                Base.Document.Update(doc);
                Base.Actions.PressSave();  // o Base.Persist();
            }
            else
            {
                PXTrace.WriteWarning("No se encontró el campo de observaciones en el DAC/Extensión. Verifica el nombre en tu ARRegisterExt/ARInvoiceExt.");
            }
        }

        // 4) Si todo ok, ahora sí: liberar
        return baseMethod(adapter);
    }

    private string GetSalespersonCD(ARRegister doc)
    {
        // Mantén tu helper actual; puedes migrar a SelectFrom<> si lo prefieres
        return QuerySQL.Vendedor(QuerySQL.ARTran(doc.RefNbr).SalesPersonID).SalesPersonCD;
    }
}
