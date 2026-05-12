# Guía de Implementación Técnica: Botón "Material Preparado" (TAB0423)

**Versión:** 1.0 (Detallada)

**Plataforma:** Acumatica ERP 2025 R2

**Autor:** Alberto Polanco

Esta guía está diseñada para que cualquier administrador de Acumatica pueda replicar la funcionalidad sin conocimiento previo del desarrollo actual.

---

## Objetivo

Implementar en Acumatica un nuevo campo, dentro de la ventana de embarques, que almacene la fecha y la hora de término de preparación del material solicitado en un embarque, con la finalidad de tener los datos necesarios para crear un KPI para el departamento de Almacén y Bodega.

## Funcionalidad

- Deberá existir un campo en la base de datos para almacenar la hora de término de preparación del material.
- Deberá existir un botón con la leyenda **Material Preparado** que permita almacenar el día y la hora en el campo correspondiente de la base de datos.
- Deberá visualizarse el día y la hora de término de preparación en la pantalla de embarques.
- Se podrá oprimir el botón y guardar la fecha y hora aunque el estado del embarque sea confirmado (equivalente a liberado).

---

## 1. Creación del Campo en la Base de Datos (DAC Extension)

1. Acceda al **Customization Project Editor** y en el panel izquierdo expanda **PANTALLAS**.
2. Localice la pantalla **SO302000 (Embarques)** y haga clic en el nodo **Campos (Fields)**.
3. Haga clic en el botón "+" (Nuevo Campo) de la barra de herramientas.
4. Complete la ventana emergente con los siguientes datos:
    - **Nombre de Campo:** UsrPreparationDate
    - **Tipo de Dato:** DateTime
    - **DisplayName:** Fecha Preparación
    - **Control de Interfaz:** DateTimeEdit
5. Haga clic en **OK** y posteriormente en el icono del Disco (**Guardar**).

---

## 2. Implementación de la Lógica de Negocio (C# Code)

Siga estos pasos para integrar el código fuente con los comentarios profesionales y mejores prácticas:

1. En el panel izquierdo, bajo la sección **CÓDIGO**, haga clic en **Archivos**.
2. Seleccione el archivo de extensión correspondiente (ej. `SOShipmentEntry_Extension.cs`) o cree uno nuevo vinculándolo a `SOShipmentEntry`.
3. Inserte el siguiente código:

```csharp
using System;
using PX.Common;
using PX.Data;
using PX.Objects.SO;

namespace PX.Objects.SO
{
    /// <summary>
    /// Extensión de lógica de negocio para la pantalla de Embarques (SOShipmentEntry).
    /// Proporciona la funcionalidad para registrar la fecha de preparación del material.
    /// </summary>
    public class SOShipmentEntry_Extension : PXGraphExtension<SOShipmentEntry>
    {
        // Definición de la acción que se vinculará al botón de la interfaz de usuario
        public PXAction<SOShipment> materialPreparado;

        /// <summary>
        /// Lógica de ejecución del botón "Material Preparado".
        /// Asigna la estampa de tiempo actual al campo personalizado del DAC.
        /// </summary>
        [PXButton(CommitChanges = true)]
        [PXUIField(DisplayName = "Material Preparado", MapEnableRights = PXCacheRights.Update)]
        protected virtual void MaterialPreparado()
        {
            // Obtiene la instancia actual del documento de embarque
            SOShipment shipment = Base.Document.Current;
            if (shipment == null) return;

            // Acceso a la extensión del registro (Data Access Class Extension)
            SOShipmentExt shipExt = shipment.GetExtension<SOShipmentExt>();

            // Asignación de fecha y hora actual del servidor utilizando PXTimeZoneInfo
            shipExt.UsrPreparationDate = PXTimeZoneInfo.Now;

            // Actualización del registro en la caché del documento
            Base.Document.Update(shipment);

            // Persistencia de los cambios en la base de datos
            Base.Save.Press();
        }

        /// <summary>
        /// Manejador del evento RowSelected del encabezado del embarque.
        /// Se utiliza para habilitar el botón y permitir la actualización de la caché en estados protegidos.
        /// </summary>
        /// <param name="e">Argumentos del evento de selección de fila</param>
        protected virtual void _(Events.RowSelected<SOShipment> e)
        {
            if (e.Row == null) return;

            // Condición para habilitar la acción cuando el embarque está en estado 'Confirmado'
            if (e.Row.Status == SOShipmentStatus.Confirmed)
            {
                // Habilita manualmente el acceso al botón
                materialPreparado.SetEnabled(true);

                // Permite la actualización del registro en la caché a pesar de que el estado sea de solo lectura
                e.Cache.AllowUpdate = true;
            }
        }
    }
}
```

---


## 3. Registro de la Acción y Workflow

Para garantizar la visibilidad en Acumatica 2025 R2, siga este procedimiento:

| **Fase**      | **Procedimiento** |
|---------------|-------------------|
| **Registro**  | En el nodo **Acciones** de SO302000, agregue `materialPreparado` con tipo "Flujo de trabajo". |
| **Workflow**  | Cree una extensión del flujo predeterminado (_Extend System Workflow_) llamada `ExtEmbarques`. |
| **Habilitación** | En el estado **Confirmado (Inherited)**, agregue la acción y marque la columna **Duplicate on Toolbar**. |

---

## 4. Finalización y Pruebas

1. Realice la publicación del proyecto (**Publish Current Project**).
2. Verifique en la pantalla de Embarques que, al seleccionar un registro con estado **Confirmado**, el botón sea visible y funcional.
