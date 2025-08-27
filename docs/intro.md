---
sidebar_position: 1
---


# - Introducción

Este documento establece el **marco de referencia** para la documentación de **control de versiones** y de las **personalizaciones** realizadas por **Marathon Group** en el **Sistema CRM de Acumatica**, así como en componentes relacionados. Su propósito es ofrecer a usuarios finales, responsables funcionales, equipo de TI y auditores una visión clara y trazable de lo que se ha cambiado, por qué se cambió y cómo se validó.

Las implementaciones cubiertas son: **CRM2023**, **CXC2023**, **CXP2023**, **GAM2023**, **MFE2023** y **TAB0423**.

---

## Objetivos de la documentación

- **Transparencia y trazabilidad:** Registrar qué se modificó, cuándo, por quién y con qué motivación.
- **Control de versiones:** Mantener un historial ordenado de cambios, facilitando auditorías y regresos controlados (rollbacks).
- **Alineación funcional-técnica:** Conectar cada cambio con su necesidad de negocio, su validación y sus evidencias de prueba.
- **Soporte y continuidad:** Servir de guía para soporte, mantenimiento y futuras iteraciones de personalización.

---

## Alcance

Esta documentación incluye, para cada implementación (p. ej., **CRM2023**, **CXC2023**, **CXP2023**, **GAM2023**, **MFE2023**, **TAB0423**):

1. **Pantallas modificadas**  
   - Identificación de la pantalla (ID y nombre en Acumatica).  
   - Descripción funcional del cambio.  
   - Impacto esperado en el proceso de negocio.  

2. **Detalle de cambios por pantalla**  
   - Campos agregados/modificados/eliminados, validaciones y lógica aplicada.  
   - Elementos UI/UX, flujos o automatizaciones (workflows, acciones, visibilidad).  
   - Objetos técnicos afectados (gráficos/graphs, DACs, extensiones, consultas, reportes).

3. **Sección “Detalles de cambios” (trazabilidad ampliada)**  
   Esta sección se **encadena** a la implementación correspondiente y documenta:  
   - **Origen del cambio:** incidente detectado, mejora propuesta o requisito.  
   - **Solicitante/Detección:** quién reportó el problema o propuso el cambio.  
   - **Aprobación/Validación funcional:** responsable que autorizó el cambio.  
   - **Responsable técnico:** persona encargada del desarrollo/configuración.  
   - **Evidencia de pruebas:** casos de prueba, datos usados, resultados y conclusiones.  
   - **Fecha de liberación y versión:** referencia exacta para control de releases.  

---

## Contenido y estructura

- **Resumen ejecutivo por implementación:** contexto, objetivos y alcance específico.  
- **Inventario de pantallas modificadas:** tabla de referencia rápida.  
- **Detalle de cambios por pantalla:** descripción técnica y funcional.  
- **Detalles de cambios (trazabilidad):** bitácora completa por cambio.  
- **Anexos:** capturas, diagramas de flujo, referencias a tickets o requerimientos.

---

## Audiencia objetivo

- **Usuarios clave (Key Users) y responsables de proceso** que necesitan comprender el impacto de las personalizaciones.  
- **Equipo de TI / Desarrollo** responsable de mantener y evolucionar el sistema.  
- **Auditoría y cumplimiento** que requieren evidencia de control de cambios.  
- **Dirección y PMO** para seguimiento y toma de decisiones.

---

## Metodología y fuentes

- **Fuente funcional:** requerimientos aprobados, tickets, minutas y correos autorizados.  
- **Fuente técnica:** repositorios de código/configuración, proyectos de personalización, registros de despliegue.  
- **Evidencias de prueba:** casos de uso, datos de prueba, capturas y resultados documentados.

La documentación se actualiza **con cada cambio liberado** y debe reflejar el estado vigente en producción.

---

## Convenciones y nomenclatura

- **Códigos de implementación:** *CRM2023, CXC2023, CXP2023, GAM2023, MFE2023, TAB0423*.  
- **Versionado:** *Mayor.Menor.Parche* (ej.: 1.3.2). Cada liberación debe indicar fecha y responsable.  
- **Identificación de pantallas:** usar el **ID de pantalla** de Acumatica y su nombre visible.  
- **Referencias cruzadas:** cada cambio debe vincularse a su ticket o requerimiento.

---

## Gobernanza y responsabilidades

- **Solicitante/Detección:** registra la necesidad y el contexto de negocio.  
- **Aprobador funcional:** valida alcance, criterios de aceptación y prioridad.  
- **Responsable técnico:** implementa, documenta y prepara evidencias de prueba.  
- **QA/Validación:** ejecuta pruebas y firma resultados contra criterios de aceptación.  
- **Liberación/Operaciones:** autoriza el paso a producción y actualiza el historial.

---

## Limitaciones

- Este documento **no sustituye** la documentación oficial de **Acumatica** ni su manual de usuario estándar.  
- La información técnica puede resumirse para fines de claridad; los detalles exhaustivos residen en los artefactos técnicos (código, scripts, proyectos de personalización).  
- Las capturas y flujos son **representativos** del estado al momento de la liberación; cambios posteriores deben documentarse en nuevas versiones.

---

## Solicitudes de cambio futuras

Toda nueva solicitud deberá:  
1) indicar objetivo y justificación,  
2) adjuntar criterios de aceptación,  
3) definir responsables funcional y técnico,  
4) plan de pruebas y evidencia, y  
5) versión objetivo y ventana de despliegue.

---

## Contacto

- **Propietario del documento:** PM/Coordinación de TI – Marathon Group.  
- **Canal de cambios y soporte:** mesa de ayuda / sistema de tickets corporativo.  
- **Repositorio y evidencias:** según política interna de TI.

---

> Esta introducción sirve como guía de lectura y marco de control para el resto de la documentación. A partir de aquí, cada implementación (CRM2023, CXC2023, CXP2023, GAM2023, MFE2023, TAB0423) contará con su sección detallada, inventario de pantallas modificadas y la bitácora de “Detalles de cambios” con la trazabilidad completa.
