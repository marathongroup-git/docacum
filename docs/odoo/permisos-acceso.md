---
sidebar_position: 2
---

# Gestión de Permisos y Roles

Para garantizar la seguridad de la información y limitar las acciones de los usuarios según sus responsabilidades, se ha configurado un esquema de permisos personalizado.

## Grupo: Marathon - Solo Lectura

Se creó un nuevo grupo de usuarios denominado **"Marathon - Solo Lectura"**. 

### Objetivo
El propósito de este perfil es permitir que ciertos usuarios puedan consultar el inventario, ver cantidades y ubicaciones, pero **restringiendo totalmente** la capacidad de crear, editar o eliminar registros, así como bloquear el acceso a configuraciones avanzadas u otros módulos no pertinentes.

### Configuración de Permisos de Acceso (ACL)

Para lograr este comportamiento, se definieron reglas de acceso estrictas (Access Control Lists) aplicadas a este grupo. 

En la configuración de "Reglas de permisos de acceso", se habilitó únicamente el permiso de **Lectura** para los modelos clave del módulo de inventario, dejando inhabilitados los permisos de Escritura, Creación y Eliminación.

#### Modelos con Acceso de Lectura
Basado en la configuración, los siguientes modelos tienen acceso habilitado para este grupo:

| Nombre del Modelo | Modelo Técnico | Permisos Otorgados |
| :--- | :--- | :--- |
| **Producto** | `product.template` | Solo Lectura |
| **Variante del producto** | `product.product` | Solo Lectura |
| **Transferir** | `stock.picking` | Solo Lectura |
| **Movimientos de producto** | `stock.move` | Solo Lectura |
| **Quants** (Stock real) | `stock.quant` | Solo Lectura |
| **Ajustes de Inventario** | `stock.inventory` / `stock.quant` | Solo Lectura |
| **Ubicaciones** | `stock.location` | Solo Lectura |

> **Nota:** Al asignar este grupo a un usuario, el sistema ocultará automáticamente los botones de "Guardar", "Editar" o "Crear" en las vistas de estos registros, proporcionando una interfaz segura de solo consulta.
