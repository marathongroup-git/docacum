# TAB0423 - Cambios en Pantallas

## Pantallas Afectadas

Las siguientes pantallas son afectadas por los cambios de TAB0423:

- **AP301000**
- **AP302000**
- **AR302000**
- **CA304000** 
- **EP301000**
- **FE000191**
- **FE000192**
- **PO303000** 
- **CR304000** 
- **IN202500** 
- **PO302000** 
- **FT301000** 
- **PO301000** 
- **SO301000** 
- **SO302000** 
- **SO303000**

## Detalle de Cambios por Pantalla

### Pantalla Facturas y Ajustes (AP301000)

- **Serie**: [Campo serie de la factura]

#### DETALLES
- **Documento XML**: [Campo para documento XML]

#### CFDI
- **UUID**: [Identificador único universal]
- **RFC**: [Registro Federal de Contribuyentes]
- **Serie**: [Serie del documento CFDI]
- **Folio**: [Folio del documento]
- **Mpago**: [Método de pago]
- **Fpago**: [Forma de pago]
- **UsoCFDI**: [Uso del CFDI]
- **FechaXml**: [Fecha del XML]
- **Moneda**: [Tipo de moneda]
- **Subtotal**: [Subtotal del documento]
- **Totalimp**: [Total de impuestos]
- **Retenidos**: [Impuestos retenidos]
- **IVA**: [Impuesto al Valor Agregado]
- **IEPS**: [Impuesto Especial sobre Producción y Servicios]
- **ISR**: [Impuesto Sobre la Renta]
- **Total**: [Total del documento]
- **ApTranDesc**: [Descripción de transacción AP]

### Pantalla Cheques y Pagos (AP302000)

- **Fecha de aplicación**: Validación fecha no mayor al día actual

#### CFDI
- **Documento XML**: [Campo para documento XML]
- **UUID**: [Identificador único universal]
- **RFC**: [Registro Federal de Contribuyentes]
- **Fecha**: [Fecha del documento]
- **Serie**: [Serie del documento]
- **Folio**: [Folio del documento]
- **Moneda**: [Tipo de moneda]
- **FormaDePagoP**: [Forma de pago]
- **UsoCFDI**: [Uso del CFDI]
- **Monto**: [Monto del documento]
- **TipoDeComprobante**: [Tipo de comprobante]
- **FechaPago**: [Fecha del pago]
- **MonedaP**: [Moneda del pago]
- **Exportación**: [Campo exportación]

### Pantalla Pagos y Aplicaciones (AR302000)

- **Fecha de Apli**: Validación fecha no mayor al día actual

### Pantalla Transacciones (CA304000)

- **Sucursal**: [Campo sucursal]

### Pantalla Reembolso de Gastos (EP301000)

#### DETALLES
- **Serie**: [Campo serie]
- **Folio**: Ampliar campo

### Pantalla Datos CFDI (FE000191)

- **Agregar XML**: [Funcionalidad agregar XML]
- **No. Ref**: [Número de referencia]
- **RFC**: [Registro Federal de Contribuyentes]
- **UUID**: [Identificador único universal]
- **FPago**: [Forma de pago]
- **MPago**: [Método de pago]
- **UsoCFDI**: [Uso del CFDI]
- **FechaXml**: [Fecha del XML]
- **Serie**: [Serie del documento]
- **Folio**: [Folio del documento]
- **ApTranDesc**: [Descripción de transacción AP]
- **Moneda**: [Tipo de moneda]
- **Subtotal**: [Subtotal del documento]
- **TotalImp**: [Total de impuestos]
- **IVA**: [Impuesto al Valor Agregado]
- **Retenidos**: [Impuestos retenidos]
- **ISR**: [Impuesto Sobre la Renta]
- **IEPS**: [Impuesto Especial sobre Producción y Servicios]
- **Total**: [Total del documento]
- **LinkedAPTran**: [Transacción AP vinculada]

### Pantalla Datos CFDI Complemento de Pagos (FE000192)

- **Agregar XML**: [Funcionalidad agregar XML]
- **No.Ref**: [Número de referencia]
- **RFC**: [Registro Federal de Contribuyentes]
- **Serie**: [Serie del documento]
- **Folio**: [Folio del documento]
- **Fecha**: [Fecha del documento]
- **UUID**: [Identificador único universal]
- **Moneda**: [Tipo de moneda]
- **FormaDePagoP**: [Forma de pago]
- **UsoCFDI**: [Uso del CFDI]
- **TipoDeComproba**: [Tipo de comprobante]
- **FechaPago**: [Fecha del pago]
- **MonedaP**: [Moneda del pago]
- **Monto**: [Monto del documento]
- **Exportación**: [Campo exportación]

### Pantalla Costo de Importación (PO303000)

- **Serie**: [Campo serie]

### Pantalla Oportunidades (CR304000)

#### DETALLES
- **Marca**: [Campo marca]
- **No. Inventario (Marca)**: [Número de inventario por marca - campo obligatorio]

### Pantalla Artículos Almacenados (IN202500)

#### EMPAQUE
- **Peso**: [Campo peso del empaque]

### Pantalla Recepción de Compras (PO302000)

- **Activar campos de pedimento**: Cuando es un proveedor extranjero
- **Desactivar campos de pedimento**: Cuando es un proveedor nacional

### Pantalla Factura Traslado (FT301000)

#### MERCANCIAS
- **Peso Neto**: [Campo peso neto de las mercancías]

### Pantalla Órdenes de Compras (PO301000)

- **Tipo de Compra**: Stock, Venta, Entrega Directa, Express, Varias
- **Peso artículo**: [Campo peso del artículo]

### Pantalla Órdenes de venta - TR (SO301000)

- **Orden de Venta**: [Campo orden de venta]

### Pantalla Órdenes de venta - TR (SO302000)

> **Nota**: Checar que se implementó aquí - *Pendiente de verificación de implementación*

### Pantalla Órdenes de venta - TR (SO303000)

> **Nota**: Checar que se implementó aquí - *Pendiente de verificación de implementación*

---

> **Nota de Observación**: Estos cambios corresponden a la actualización TAB0423 y se enfocan principalmente en mejorar la integración con documentos XML y CFDI, agregando validaciones de fechas, campos de peso para artículos y mercancías, y funcionalidades específicas para el manejo de proveedores extranjeros vs nacionales. Se incluyen dos pantallas (SO302000 y SO303000) que requieren verificación de implementación.