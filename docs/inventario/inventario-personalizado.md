---
sidebar_position: 2
---

# Gestión de Inventario Personalizado

El módulo central del sistema permite administrar el ciclo de vida completo de cada activo dentro de Marathon Group, desde su adquisición hasta su descontinuación.

## Creación y Registro de Activos

Cada artículo en el sistema requiere información fundamental para su trazabilidad. El formulario de "Nuevo Activo" obliga a registrar los siguientes campos:

- **Código / Placa:** Identificador único del activo (ej. `800S1...`). Si no se proporciona uno en la importación masiva, el sistema genera automáticamente un identificador temporal.
- **Mobiliario / Artículo:** Nombre o descripción corta del bien (ej. *Silla Ejecutiva, Laptop HP*).
- **Ubicación:** 
  - **Sucursal:** Sede física donde se encuentra el activo (ej. *Matriz, La Harinera*).
  - **Departamento:** Área específica dentro de la sucursal (ej. *Ventas, Punto Rojo*).
- **Responsable:** Usuario o empleado específicamente a cargo del cuidado del activo.
- **Detalles Técnicos:** Marca, modelo, número de serie, tipo/material y color.
- **Imágenes del Activo:** Se puede adjuntar evidencia visual (fotografías) del artículo, las cuales se optimizan automáticamente y se almacenan de forma segura en un bucket de **Cloudflare R2**.
- **Tipo de Inventario:** Diferenciación entre mobiliario/equipo y herramientas (`inventory_type`).

### Etiquetado Inteligente (Códigos QR)

Para facilitar las auditorías físicas, el sistema genera automáticamente un **Código QR** único para cada activo registrado. 
Al escanear este código desde cualquier dispositivo móvil (como un teléfono o tablet), el personal autorizado es redirigido inmediatamente a la vista pública de los detalles del artículo, lo que permite verificar la autenticidad y el estado del activo en tiempo real.

## Importación Masiva

Para facilitar la migración de datos o la carga inicial, el sistema cuenta con un robusto módulo de **Importación** que soporta archivos `.xlsx`, `.xls` y `.csv`.

### Flujo de Importación:

1. **Subida del archivo:** El administrador y el gestor de inventario carga el documento de Excel.
2. **Previsualización de Hojas:** El sistema detecta automáticamente todas las pestañas (hojas) del documento y permite seleccionar cuál importar. El nombre de la hoja se utilizará como la *Clasificación* del grupo de activos.
3. **Mapeo Inteligente de Columnas:** 
   - El sistema analiza las cabeceras del Excel e intenta emparejarlas automáticamente (mediante un proceso de normalización de cadenas) con los campos de la base de datos (Sucursal, Departamento, Usuario, etc.).
   - El usuario puede corregir manualmente cualquier asociación incorrecta mediante selectores en la interfaz.
4. **Validación y Ejecución:** 
   - El sistema muestra una previsualización de las primeras filas.
   - Durante la inserción, el sistema procesa los registros en lotes (*batches* de 50) para no sobrepasar los límites operativos de Cloudflare D1.
   - Se omiten automáticamente los identificadores (Códigos de Activo) duplicados y se registran los nuevos de forma eficiente, mostrando al final un resumen de "Insertados" y "Omitidos".

## Módulos de Inventario (Mobiliario vs Herramientas)

El sistema agrupa los activos no en un único repositorio global, sino dividiéndolos en paneles virtuales especializados de acuerdo a su naturaleza:
1. **Mobiliario e Instalaciones:** Agrupa todo el equipo administrativo, vehículos, tecnología de escritorio y mobiliario de las distintas sucursales.
2. **Herramientas de Trabajo:** Un entorno y vista completamente independiente dedicada de forma exclusiva a las herramientas operativas.

## Auditoría: Conteo Rápido de Inventario

La plataforma incorpora una herramienta esencial para realizar auditorías de piso: el módulo de **Conteo Rápido**.
Esta funcionalidad agiliza drásticamente los levantamientos físicos: en lugar de buscar artículo por artículo de forma manual, el operador puede ir alimentando los códigos físicos encontrados (vía teclado o escáner celular). El sistema actualizará ágilmente los hallazgos y facilitará la conciliación inmediata (saber qué sobra, qué falta y qué está correcto).

## Estados del Activo

Un activo cuenta con un estado operativo dentro de su ciclo de vida:

- **Activo:** El artículo está en uso regular y dentro del inventario operativo.
- **Inactivo:** El artículo ha sido retirado o temporalmente dado de baja del inventario.

> 📝 **Nota:** Todas las excepciones o errores producidos durante el guardado de activos (como intentar duplicar una placa o problemas de base de datos) se muestran al usuario de manera nativa mediante componentes de alerta (*Alerts*) integrados en la interfaz para una experiencia de usuario clara e ininterrumpida.
