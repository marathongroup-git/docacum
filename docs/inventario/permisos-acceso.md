---
sidebar_position: 3
---

# Seguridad y Permisos de Acceso

El Sistema de Inventario maneja información sensible y corporativa de Marathon Group, por lo que integra un robusto modelo de control de acceso desde el código hasta la base de datos.

## Autenticación

El acceso a cualquier ruta del sistema (con la excepción de la vista pública de activos mediante códigos QR) requiere credenciales válidas.

### Gestión de Sesiones
1. **Verificación de Credenciales:** En el inicio de sesión (`/login`), se validan el nombre de usuario y la contraseña.
2. **Encriptación Segura:** Las contraseñas están fuertemente encriptadas en la base de datos mediante el algoritmo `bcrypt`.
3. **Tokens de Sesión:** Tras un login exitoso, el sistema genera un identificador único (UUID v4) que se guarda en la tabla `sessions` de la base de datos, con una caducidad predeterminada (ej. 30 días).
4. **Cookies HTTP-Only:** El identificador de sesión se devuelve al cliente como una cookie segura (gestionada por las utilidades de sesión de Remix/React Router v7), protegiendo al sistema contra ataques XSS.

## Control de Acceso Basado en Roles (RBAC)

El sistema utiliza *Roles* y *Permisos* para determinar el nivel de autorización y las acciones que puede realizar cada usuario autenticado.

### Modelado en Base de Datos

El control de acceso consta de tres componentes principales:
* **Roles** (`roles`): Grupos que definen conjuntos de permisos predeterminados.
* **Permisos** (`permissions`): Acciones específicas permitidas (formato `acción:entidad:contexto`, ej. `create:inventory:any`).
* **Roles de Usuario** (`userRoles`): Tabla pivote que asocia a los usuarios con múltiples roles simultáneos.

### Roles Principales

- **Administrador (`admin`):** Tiene acceso incondicional a todo el sistema. Puede visualizar el *Dashboard* completo de métricas, manejar inventario de manera irrestricta y crear o eliminar otros usuarios en el panel administrativo (`/c/users/new`).
- **Usuario (`user`):** Nivel de acceso estándar enfocado en el área operativa. Puede visualizar el inventario y sus detalles, pero ciertas vistas, gráficas y acciones estarán deshabilitadas según sus permisos puntuales.

## Mecanismos de Protección

Las acciones críticas y las vistas confidenciales están protegidas en dos capas de la aplicación:

### 1. Protección en el Backend (Capa de Datos)
Las rutas sensibles están defendidas mediante funciones de seguridad, por ejemplo:
- `requireUser(request)`: Verifica si hay una sesión válida antes de retornar los datos iniciales de una página (`loader`).
- `requireAdmin(request)`: Bloquea el acceso a rutas administrativas si la cuenta actual no posee el rol `admin`.
- `requirePermission(request, "delete:inventory:any")`: Verifica que la sesión actual posea explícitamente el derecho antes de realizar una mutación destructiva en la base de datos (dentro de los `actions`). 

Si un usuario intenta saltarse la interfaz (ej. enviando una petición curl), el servidor rechazará la operación.

### 2. Protección en el Frontend (Capa de Interfaz UX)
Para evitar la frustración del usuario, la interfaz se adapta dinámicamente a sus capacidades:
- **Componente `<PermissionGuard>`:** Utilizado para envolver elementos delicados de la interfaz. Si el usuario actual no posee el permiso paramétrico o el rol adecuado, botones como "Editar Detalles" o la tarjeta completa de "Zona de Peligro (Eliminar Activo)" ni siquiera se renderizarán en su pantalla.
- **Rutas Prohibidas:** La barra lateral de navegación principal ocultará enlaces a módulos a los que el empleado no tiene derecho de acceder.
