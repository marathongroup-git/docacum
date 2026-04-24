---
id: campo-observaciones-ft
title: Personalización de Factura de Traslado — Campo Observaciones (CST.FT.30.10.00)
sidebar_position: 1
description: Procedimiento para personalizar la pantalla CST.FT.30.10.00 (Factura de traslado) en Acumatica, ampliando el campo Observaciones a multilínea y mayor tamaño, con lineamientos de publicación y consideraciones.
---

> **Fuente**: documento adjunto “Campo Observaciones FT.docx”. fileciteturn0file0

# Resumen

Se documenta la **personalización de la pantalla `CST.FT.30.10.00` (Factura de traslado)** en **Acumatica** para **ampliar el campo *Observaciones*** a **multilínea** y **mayor tamaño**, con el objetivo de **capturar y visualizar** datos de **tarimas, dimensiones y pesos** y que dicha información sea **claramente visible** para el equipo de **Logística**.

---

## Objetivos del cambio

- Ampliar el campo *Observaciones* a **multilínea** y **mayor tamaño** para registrar: número de **tarimas**, **dimensiones** y **pesos**.
- **Asegurar visibilidad completa** de esta información para **Logística** en la **interfaz**.
- **Reflejar** los datos en la **impresión** del documento de traslado de manera **ordenada y separada**, facilitando **entregas**.

---

## Áreas involucradas

- **Área solicitante**: *Almacén y Bodega* — **Fausto Zamora**.  
- **Áreas beneficiadas**: *Almacén y Bodega*, *Tráfico y Logística*.

---

## Alcance y consideraciones

- La personalización se realiza **desde Acumatica**, sin requerir cambios en **código fuente**.  
- Impacta la **ventana**: *Órdenes de Venta → Facturas → (Abrir una factura) → pestaña Traslado*.
- **Limitación conocida**: tras **actualizaciones del sistema**, el procedimiento deberá **reaplicarse** o **asegurarse** mediante la **implementación** que mantiene la vista modificada.  

:::note
En Marathon Group, esta ventana está incluida dentro del **proyecto de personalización `MFE2023`** (ajústese según el ambiente).
:::

---

## Vista actual y vista objetivo

- *Vista actual*: el campo **Observaciones** no permite una visualización óptima para la información de tarimas, dimensiones y pesos.
- *Vista objetivo*: **campo multilínea** y **expandido** para capturar/visualizar la información; distribución de campos ajustada para mejorar el **layout**.

> Inserta aquí, si se desea, capturas de pantalla de *antes* y *después*:
>
> - `static/img/crm/campo-observaciones-ft/antes.png`
> - `static/img/crm/campo-observaciones-ft/despues.png`



<figure style={{textAlign:'center'}}>
  <img src="antes.png" alt="Antes" width="600" />
  <figcaption>Figura 1. Vista antes del cambio</figcaption>
</figure>


---

## Procedimiento (desde Acumatica)

1. **Abrir** la **Factura de traslado** en: *Órdenes de Venta → Facturas → (abrir una factura) → pestaña Traslado*.
2. Ir a **Personalizaciones → Inspeccionar elemento**. El puntero (con “?”) permite seleccionar el **campo *Observaciones***.
3. En el **inspector de elementos**, **seleccionar** o **crear** el **Proyecto de personalización** correspondiente (ej.: `MFE2023`).  
4. Abrir el **Editor de personalización de proyectos** (*Customization Project Editor*).  
   - Ubicar el **elemento** que representa el **campo *Observaciones***.  
   - **Modificar propiedades** para que sea **multilínea** y con **mayor tamaño** (alto/filas).  
   - **Reubicar** campos a otras **columnas** según la distribución objetivo para optimizar la visualización.  
5. **Guardar** los cambios en el **proyecto**.
6. En el menú **Publish**, elegir **Publish Current Project**.  
   - Esperar la **compilación**.  
   - Al finalizar, **Close Compilation pane**.
7. **Verificar** en interfaz que:  
   - El campo *Observaciones* acepte **múltiples líneas**.  
   - La **distribución** de los campos en columnas sea la esperada.  
   - La **impresión** del documento muestre la **información** de forma **ordenada**.

:::tip Sugerencias de prueba
- **Captura funcional**: registrar datos de tarimas/dimensiones/pesos y validar visibilidad.
- **Impresión**: previsualizar y verificar **orden** y **separación** de la información.
- **Regresión**: confirmar que otros elementos no hayan perdido **visibilidad** o **validaciones**.
:::

---

## Publicación y mantenimiento

- **Publicación**: mediante **Publish Current Project** en **Customization**.
- **Mantenimiento**: tras **actualizaciones** de Acumatica, **revisar** y **reaplicar** la personalización si fuera necesario.
- **Respaldo**: mantener el **proyecto de personalización** exportado y versionado en el **repositorio** de Marathon Group.

---

## Historial de cambios (sugerido)

| Versión | Fecha | Implementación | Responsable | Descripción |
|---|---|---|---|---|
| 1.0.0 | 2025-09-08 | MFE2023 | — | Documento inicial de personalización del campo Observaciones en CST.FT.30.10.00 |

---

## Referencias internas

- Implementaciones relacionadas: **CRM2023**, **CXC2023**, **CXP2023**, **GAM2023**, **MFE2023**, **TAB0423**.
- Políticas de documentación y publicación de **Marathon Group**.
