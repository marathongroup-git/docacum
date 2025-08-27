# CRM2023 - Cambios en Pantallas

## Pantallas Afectadas

Las siguientes pantallas son afectadas por los cambios de CRM2023:

- **AP301000** - Facturas y Ajustes
- **CR306000** - Casos
- **IN303000** - Ajustes
- **IN401000** - Resumen del Inventario
- **PO301000** - Órdenes de Compra
- **PO302000** - Recepción de Compra
- **RQ301000** - Solicitudes
- **SO301000** - Órdenes de Venta TR

## Detalle de Cambios por Pantalla

### Pantalla Facturas y Ajustes (AP301000)

- **Fecha**: Validación que no sea mayor a fecha actual

### Pantalla Casos (CR306000)

- **Cuenta del Negocio**: Inhabilitado
- **Asunto**: Inhabilitado

### Pantalla Ajustes (IN303000)

#### INFO AJUSTE
- **Motivo Ajuste**: [Campo requerido]

### Pantalla Resumen del Inventario (IN401000)

- **Expandir por número de Lote/Serie**: Chequeado y inhabilitado

### Pantalla Órdenes de Compra (PO301000)

#### DETALLES
- **Vendedor**: [Campo agregado/modificado]
- **Solicitud**: [Campo agregado/modificado]
- **Cliente**: [Campo agregado/modificado]

### Pantalla Recepción de Compra (PO302000)

- **Fecha**: Validación no mayor al día actual
- **Crear Factura**: Inhabilitado
- **Serie**: [Campo agregado/modificado]

### Pantalla Solicitudes (RQ301000)

- **Cliente**: [Campo agregado/modificado]

#### DETALLES
- **Costo unitario estimado**: Debe ser mayor a 0 (>0)
- **Cantidad**: Debe ser mayor a 0 (>0)
- **Fecha requerida**: Valor obligatorio
- **Fecha Prometida**: Valor obligatorio

### Pantalla Órdenes de Venta TR (SO301000)

#### MOTIVO DE TRANSFERENCIA
- **Motivo Transferencia**: [Campo requerido]
- **Orden de Venta**: [Campo agregado/modificado]

---

> **Nota**: Estos cambios forman parte de la actualización CRM2023 y deben ser implementados en todas las pantallas mencionadas.