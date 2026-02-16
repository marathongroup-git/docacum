---
sidebar_position: 1
---

# Módulo de Inventario Personalizado

En esta sección se detalla la creación de un esquema de tabla personalizado en Odoo para la gestión de inventario, permitiendo la importación de listas con mapeo automático de campos.

## Objetivo

El objetivo es extender el modelo de inventario de Odoo creando campos personalizados que coincidan con nuestra estructura de datos existente, facilitando así la migración e importación masiva de información.

## Estructura de Datos

Se ha diseñado un esquema de tabla que incluye los siguientes campos personalizados:

| Campo (Nombre Etiqueta) | Tipo de Dato Sugerido | Descripción |
| :--- | :--- | :--- |
| **Sucursal** | Many2one / Char | Identificador de la sucursal donde se encuentra el bien. |
| **No. de Inventario** | Char | Código único de identificación del inventario. |
| **Descripción** | Text | Descripción detallada del producto o activo. |
| **Ubicación** | Many2one / Char | Ubicación física específica dentro de la sucursal o almacén. |
| **Cantidad** | Float / Integer | Cantidad física disponible. |
| **U.M.** | Many2one (uom.uom) | Unidad de Medida (ej. Piezas, Kg, Lt). |
| **Precio Unitario** | Monetary / Float | Precio de venta por unidad. |
| **Tot. Precio** | Monetary / Float | Cálculo automático: `Cantidad * Precio Unitario`. |
| **Costo Unitario** | Monetary / Float | Costo de adquisición por unidad. |
| **Tot. Costo** | Monetary / Float | Cálculo automático: `Cantidad * Costo Unitario`. |
| **No. Lote Serie** | Char | Número de lote o serie para rastreabilidad. |
| **Fecha de Vencimiento** | Date | Fecha de caducidad del lote (si aplica). |
| **Código de Razón** | Char / Selection | Código para clasificar la razón del movimiento o estado. |
| **Categoría del producto** | Many2one (product.category) | Clasificación o familia a la que pertenece el producto. |

## Implementación en Odoo (Versión Community)

La implementación se realizó directamente sobre la versión gratuita de Odoo, utilizando el modo desarrollador para crear campos personalizados y editar la vista XML, complementado con Acciones de Servidor para los cálculos automáticos.

### 1. Creación de Campos y Vista XML

Se crearon los campos necesarios directamente en el modelo de productos (`product.template` o `product.product`) y se modificó la vista de lista para incluirlos.

A continuación se muestra el fragmento XML de la vista utilizada:

```xml
<list string="Product" multi_edit="1" sample="1">
    <field name="product_variant_count" column_invisible="True"/>
    <field name="sale_ok" column_invisible="True"/>
    <field name="currency_id" column_invisible="True"/>
    <field name="cost_currency_id" column_invisible="True"/>
    <field name="is_favorite" widget="boolean_favorite" optional="show" nolabel="1"/>
    
    <!-- Campos Personalizados -->
    <field name="x_Sucursal" string="Sucursal"/>
    <field name="default_code" optional="show" string="No. de Inventario"/>
    <field name="name" string="Descripción"/>
    <field name="x_Ubicacion_Marathon" string="Ubicación"/>
    <field name="qty_available" string="Cantidad" decoration-danger="qty_available &lt; 0" optional="show" sum="Total On Hand" readonly="1"/>                
    <field name="x_U_M_" string="U.M."/>
    
    <field name="list_price" string="Precio Unitario" widget="monetary" options="{'currency_field': 'currency_id'}" optional="show" decoration-muted="not sale_ok"/>
    
    <!-- Total Precio (Calculado) -->
    <field name="x_Tot_Precio" string="Tot. Precio"/>
    
    <field name="standard_price" widget="monetary" options="{'currency_field': 'cost_currency_id'}" optional="show" readonly="1"/>
    
    <!-- Total Costo (Calculado) -->
    <field name="x_Tot_Costo" string="Tot. Costo"/>
    
    <field name="x_No_Lote_Serie" string="No. Lote/Serie"/>
    <field name="x_Codigo_Razon" string="Código Razón"/>
    <field name="x_Notas" string="Notas"/>
    
    <field name="product_tag_ids" widget="many2many_tags" optional="hide"/>
    <field name="barcode" optional="hide" readonly="product_variant_count != 1"/>
    <field name="company_id" options="{'no_create': True}" groups="base.group_multi_company" optional="hide"/>
    <field name="virtual_available" string="Forecasted" decoration-danger="virtual_available &lt; 0" optional="show" decoration-bf="1" sum="Total Forecasted" readonly="1"/>
    <field name="categ_id" optional="hide"/>
    <field name="type" optional="hide" readonly="1"/>
    <field name="uom_id" readonly="1" optional="show" groups="uom.group_uom"/>
    <field name="active" column_invisible="True"/>
    <field name="activity_exception_decoration" widget="activity_exception"/>
</list>
```

### 2. Automatización con Acciones de Servidor

Para calcular los valores de `Tot. Precio` y `Tot. Costo` de forma dinámica sin desarrollos complejos, se creó una **Acción de Servidor** en Python. Esta acción recorre los registros seleccionados y actualiza los campos basándose en la cantidad y el precio/costo unitario.

**Código Python de la Acción:**

```python
# Recorremos cada registro seleccionado
for record in records:
    # Verificamos si estamos en la plantilla o en la variante
    # Para asegurar que siempre tengamos acceso a los precios y costos
    cant = record.qty_available or 0.0
    prec = record.list_price or 0.0
    cost = record.standard_price or 0.0
    
    # Calculamos los totales
    total_precio = prec * cant
    total_costo = cost * cant
    
    # Escribimos aire directamente en el registro
    record.write({
        'x_Tot_Precio': total_precio,
        'x_Tot_Costo': total_costo
    })
```

### 3. Importación de Datos

Gracias a esta configuración, la importación de datos se simplifica:

1.  Ve a la vista de lista modificada.
2.  Selecciona **Favoritos** > **Importar registros**.
3.  Sube tu archivo conteniendo columnas que coincidan con los nombres de campo (ej. `x_Sucursal`, `x_Ubicacion_Marathon`).
4.  Odoo reconocerá y mapeará automáticamente las columnas.
