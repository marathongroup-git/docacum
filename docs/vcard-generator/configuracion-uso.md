---
sidebar_position: 3
---

# Configuración y Uso

Esta guía detalla cómo gestionar la información de los colaboradores y utilizar el panel generador para descargar los recursos gráficos.

## Configuración de Empleados

La información de los empleados se gestiona a través del archivo centralizado `src/data/employees.ts`.

### Estructura de Datos (TypeScript)

Cada empleado se define como un objeto dentro de un arreglo, con las siguientes propiedades:

| Campo | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `id` | `string` | **Identificador único**. Se usa para generar la URL y el nombre del archivo. | `"NLopez"` |
| `firstName` | `string` | Nombre(s) del colaborador. | `"Ana"` |
| `lastName` | `string` | Apellido(s). | `"López"` |
| `company` | `string` | Empresa perteneciente al grupo. | `"Marathon Group"` |
| `jobTitle` | `string` | Cargo o puesto laboral. | `"Coordinadora"` |
| `email` | `string` | Correo electrónico corporativo. | `"ana@...mx"` |
| `officePhone` | `string` | Teléfono de oficina. | `"+52..."` |
| `extension` | `string` | Extensión telefónica (opcional). | `"2014"` |
| `phone` | `string` | Teléfono móvil o directo. | `"+52..."` |
| `website` | `string` | Sitio web de la empresa. | `"https://..."` |
| `nota` | `string` | Información adicional (opcional). | `"Soporte"` |
| `video` | `string` | URL de video presentación (opcional). | `"https://..."` |

### Agregar un Nuevo Empleado

Para agregar un nuevo empleado:
1.  Abre el archivo `src/data/employees.ts`.
2.  Ubica el final del arreglo `employees`.
3.  Añade un nuevo objeto JSON siguiendo la estructura.

> **Importante**: Asegúrate de que el campo `id` sea único (ej: primera letra del nombre + apellido), ya que este evita conflictos en los enlaces.

#### Ejemplo Práctico

Si deseas agregar a "Ana López", el código debería verse así dentro del archivo:

```typescript
export const employees: Employee[] = [
  // ... empleados anteriores ...
  {
    id: "ALopez",
    firstName: "Ana",
    lastName: "López",
    jobTitle: "Coordinadora de Marketing",
    company: "Marathon Group",
    email: "ana.lopez@marathongroup.mx",
    phone: "+52 55 1234 5678",
    officePhone: "+52 55 8765 4321",
    extension: "2014",
    website: "https://www.marathongroup.mx",
    // photo: "images/ana-lopez.jpg" // Opcional: Asegúrate que esta imagen exista en la carpeta public
  }, 
  // ... otros empleados
];
```

---

## Panel Generador (LinkGenerator)

El proyecto incluye un panel de administración dedicado para la generación y gestión visual de los códigos QR.

### Acceso

La herramienta se encuentra en la ruta: `/generator`.
*   **URL Ejemplo**: `https://marathongroup-git.github.io/vcard/#/generator`

### Interfaz de Usuario

El Panel Generador ha sido diseñado para ser intuitivo y rápido de usar por el equipo de diseño o RRHH.

#### 1. Selección de Colaborador
Al ingresar, verás un selector desplegable con funcionalidad de búsqueda.
*   **Buscador Integrado**: Escribe el nombre o apellido del colaborador para filtrar la lista en tiempo real.
*   **Vista Previa**: Al seleccionar un nombre, verás inmediatamente la información (foto/cargo) para confirmar que es la persona correcta.

#### 2. Vista Previa del Código QR
Una vez seleccionado un colaborador:
*   Se genera automáticamente un **código QR único** en pantalla.
*   El QR incluye el **logo corporativo** incrustado en el centro.
*   Los colores se adaptan a la identidad visual de la marca (**Rojo Marathon**).

#### 3. Descarga de Recursos
El panel ofrece opciones de descarga optimizadas:

*   **Botón "Descargar PNG"**: Genera una imagen de alta resolución (1000x1000 píxeles).
    *   **Uso**: Ideal para enviar a servicios de imprenta, tarjetas de presentación físicas, gafetes o firmas de correo.
    *   **Formato**: Fondo transparente y alta calidad.

### Flujo de Trabajo Típico

1.  Abre el **Panel Generador**.
2.  **Busca** al empleado por su nombre en el selector.
3.  Verifica que el QR aparezca correctamente en pantalla.
4.  Presiona **"Descargar PNG"**.
5.  Envía el archivo al diseñador o imprímelo directamente.
