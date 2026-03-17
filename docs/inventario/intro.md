---
sidebar_position: 1
---

# Introducción al Sistema
**Elaboró:** Mauricio Isaac Hernández Hernández
**Fecha:** 06 de marzo del 2026  
**Correo:** mhhernandez@marathongroup.mx  
 
Bienvenido a la documentación del **Sistema de Inventario Marathon Group**. Esta aplicación web fue diseñada para gestionar de manera eficiente los activos mobiliario y equipos de la empresa, asegurando un control preciso sobre su ubicación, estado y responsable.

## Stack Tecnológico

El sistema está construido con tecnologías modernas para garantizar un alto rendimiento, seguridad y escalabilidad en Cloudflare:

- **Frontend & Enrutamiento:** [React Router v7](https://reactrouter.com/)
- **Estilos y Componentes:** [Tailwind CSS](https://tailwindcss.com/) y [shadcn/ui](https://ui.shadcn.com/)
- **Base de Datos:** [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite distribuido)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Infraestructura:** [Cloudflare Pages](https://pages.cloudflare.com/)

## Características Principales

- 📦 **Gestión Centralizada:** Registro detallado de activos con soporte para marca, modelo, número de serie y estado operativo.
- 🏢 **Control por Ubicación:** Asignación de activos a distintas sucursales y departamentos.
- 👥 **Responsables Dedicados:** Vinculación de cada activo a un usuario o empleado responsable de su cuidado.
- 📱 **Etiquetado Inteligente:** Generación automática de códigos QR para cada artículo, facilitando su identificación rápida desde dispositivos móviles.
- 📥 **Importación Masiva:** Carga ágil de inventario mediante plantillas de Excel (`.xlsx`, `.xls`) y archivos `.csv`.
- 📊 **Dashboard Analítico:** Panel de control con métricas en tiempo real y gráficos del estado actual del inventario.
- 🔐 **Seguridad Avanzada:** Autenticación basada en sesiones y robusto control de acceso basado en roles (RBAC).

## Estructura de esta Documentación

En esta sección encontrarás manuales detallados sobre el funcionamiento interno del sistema:

1. **Gestión de Inventario Personalizado:** Detalles sobre la creación, importación y ciclo de vida de los activos.
2. **Permisos y Control de Acceso:** Información sobre la arquitectura de seguridad, roles de usuario y protección de rutas.
