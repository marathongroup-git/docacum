---
id: crear-sucursal
title: Crear sucursal en Acumatica
sidebar_label: Crear sucursal
---

> Documento generado para el proyecto **Sucursal Gastos Corporativos**.

Procedimiento: Crear Sucursal en Acumatica
Pantallas: CS102000, SM201025, CS201010
Versión 1.0  |  Fecha: 16-ene-2026
Propietario del proceso: Cristian Ruiz (MarathonGroup)
Documento base: CREAR SUCURSAL.docx
# Objetivo

Establecer los pasos estándar para crear y configurar una sucursal (Branch) en Acumatica, incluyendo roles, empleados, consecutivos y almacenes.
# Prerequisitos

- Permisos de Administrador / Configuración en Acumatica.
- Definición previa de la estructura de la nueva sucursal (nombre, dirección, RFC/régimen y política de acceso).
# Datos requeridos de la sucursal

- Identificador de la sucursal (debe cumplir con la llave segmentada BIZACCT)
- Nombre de la sucursal
- Dirección
- Información de registro de impuestos
# Procedimiento

1. Crear la sucursal
- Ir a Más Opciones > Configuración > Organización > Sucursales (CS102000).
- Crear un nuevo registro de sucursal.
- Capturar la información general requerida.
- (Opcional) Cambiar el color de fondo de la sucursal en la pestaña Visual Appearance.
2. Crear/ajustar rol de acceso (Perfil 0800)
- Ir a Seguridad de usuario > Derechos de Acceso > Derechos de Acceso por Rol (SM201025).
- Crear el rol/perfil 0800 (o validar que exista).
- Asociar el rol 0800 a la sucursal nueva según la política interna.
3. Asociar empleados
- Asignar a los empleados que operarán en la nueva sucursal.
- Importante: otorgar acceso a la sucursal nueva al usuario Administrador para soporte y configuración.
4. Definir consecutivos (numeración)
- Ir a Configuración > Ajustes comunes > Ajustes comunes > Consecutivos (CS201010).
- Definir la numeración para la sucursal, usando los consecutivos estándar listados en la sección correspondiente.
5. Crear almacenes
- Ir a Inventario > Perfiles > Almacenes.
- Crear los almacenes requeridos para la sucursal (según el diseño logístico y contable).
# Consecutivos a configurar (CS201010)

Capturar o validar los siguientes consecutivos para la sucursal. Ajustar solo si existe una política interna distinta.

## Tabla de consecutivos

| Numeración | Número inicial |
| --- | --- |
| BATCH | IGL000000 |
| CATRAN | ITR00000 |
| CATRANSFER | ITN00000 |
| CAPOLIZA | ICA00000 |
| APPOLIZA | PIP00000 |
| APBILL | IF000000 |
| APPAYMENT | PIC00000 |
| APDEBIT | ID000000 |
| APCREDIT | PIC00000 |
| ARPOLIZA | IPR00000 |
| ARINVOICE | IRF00000 |
| ARPAYMENT | IP000000 |
| ARDEBIT | IRD00000 |
| ARCREDIT | IRC00000 |
| ARELIMSDOS | ESPI00000 |
| INPOLIZA | IIN00000 |
| INRECEIPT | IEI00000 |
| INISSUE | ISI00000 |
| INADJUST | IAI00000 |
| INKITASSY | IKI00000 |
| PIID | IIF00000 |
| INREPL | IRI00000 |
| PORECEIPT | IRC00000 |
| POORDER | IOC00000 |
| POLANDCOST | ICI00000 |
| SOSHIPMENT | I000000 |
| RQREQUISIT | IRE00000 |
| RQITEM | ISA00000 |
| OPPORTUNTY | OI00000 |
| CASE | IC00000 |
| CRQUOTE | IQ00000 |
| EPCLAIM | IRE00000 |
| EPRECEIPT | ICE00000 |
| DR | DI000000 |
| CR | NCI000000 |
| HF | HI000000 |
| CO | NI000000 |
| LF | LI000000 |
| FF | IFR000000 |
| NA | NAI000000 |
| CA | ACI000000 |
| NF | NCI000000 |
| PA | AI000000 |
| FA | FAI000000 |
| QT | QI000000 |
| TR | TI000000 |
| VR | VI000000 |

# Tareas posteriores (almacén)

- A partir de este punto son tareas a realizar por el encargado de almacén.
- Correr el reporte de existencias de todos los almacenes de división ICT.
- Nota: Verificar que los artículos realmente pertenezcan a la división ICT.
- Transferir la mercancía de ICT.
- Si no permite la transferencia, validar el inventario en el almacén donde hay existencia de ICT: Inventario > Procesos > Validar Inventario.
# Checklist de cierre

☐ Sucursal creada y activa en CS102000.
☐ Color/visual configurado (si aplica).
☐ Rol 0800 creado/validado y asociado a la sucursal.
☐ Usuarios/empleados asignados a la sucursal, incluido Administrador.
☐ Consecutivos configurados en CS201010.
☐ Almacenes creados y disponibles en Inventario.
☐ Transferencia/validación de inventario ICT ejecutada (si aplica).
Nota: Las rutas de menú pueden variar según la personalización y el idioma de la instancia.

# Anexos

## Capturas del procedimiento (referencia)

![procedimiento-pagina-01.png](/img/crear-sucursal/procedimiento-pagina-01.png)

![procedimiento-pagina-02.png](/img/crear-sucursal/procedimiento-pagina-02.png)

![procedimiento-pagina-03.png](/img/crear-sucursal/procedimiento-pagina-03.png)

