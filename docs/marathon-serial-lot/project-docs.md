---
id: marathon-serial-lot-docs
title: Marathon Serial Lot - Documentación Técnica
sidebar_label: Documentación Técnica
author: Mauricio Isaac Hernández Hernández
author_email: mhhernandez@marathongroup.mx
date: 2026-03-17
---

# Marathon Serial Lot

> React Router v7 · Cloudflare Pages · Bun · Tailwind CSS v4 · OData Integration

**Autor:** Mauricio Isaac Hernández Hernández — [mhhernandez@marathongroup.mx](mailto:mhhernandez@marathongroup.mx)
**Fecha:** 17 de marzo de 2026

---

## Introducción

**Marathon Serial Lot** es una herramienta técnica de alto rendimiento diseñada para la gestión operativa de números de serie y lotes, integrada directamente con el ecosistema de **Acumatica ERP**. Su arquitectura híbrida permite procesar consultas masivas de datos en tiempo real y generar documentación física (etiquetas QR) con precisión milimétrica.

Aunque el proyecto incluye una estructura preparada para escalar hacia CRM, Contabilidad y Analítica, su núcleo operativo actual reside en la eficiencia del módulo de **Inventario** y la comunicación mediante **OData**.

---

## Stack Tecnológico Detallado

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Runtime** | [Bun](https://bun.sh/) | Ejecución ultra-rápida, gestión de paquetes y bundler integrado. |
| **Framework** | [React Router v7](https://reactrouter.com/) | Motor de SSR (Server-Side Rendering) y manejo de rutas complejas. |
| **Hosting & Edge** | [Cloudflare Pages](https://cloudflare.com/) | Despliegue global en el edge para baja latencia y alta disponibilidad. |
| **Estilos & UI** | [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) | Sistema de diseño moderno basado en variables CSS nativas y componentes premium. |
| **Integración** | [OData Protocol](https://www.odata.org/) | Estándar de consulta para la extracción síncrona de datos desde Acumatica. |
| **Validación** | [Zod](https://zod.dev/) | Tipado fuerte y validación de esquemas para asegurar la integridad de los datos. |
| **Documentos** | [jsPDF](https://github.com/parallax/jsPDF) | Motor de renderizado para la creación de archivos PDF optimizados para impresión térmica. |

---

## Funcionamiento del Núcleo Operativo

### 1. Módulo de Inventario e Inteligencia de Datos
Ubicado en `@/features/inventory`, este módulo es el corazón del sistema. A diferencia de las aplicaciones tradicionales, no almacena datos de productos localmente, sino que actúa como una interfaz inteligente para Acumatica.

- **Búsqueda Indexada**: Utiliza el código de recepción de Acumatica como llave primaria de consulta.
- **Renderizado Eficiente**: Emplea tablas interactivas que permiten la selección múltiple y el filtrado por sucursal o ubicación en tiempo real.

### 2. Integración OData (Acumatica Bridge)
La comunicación se realiza mediante peticiones autenticadas hacia el servidor de Marathon.
- **Endpoint**: `https://acumatica.marathongroup.mx/MarathonDB/OData/MARATHON/Recepciones-Lotes-Detalle`
- **Lógica de Filtrado**: Se implementa mediante el parámetro `$filter`, permitiendo que el servidor de Acumatica entregue únicamente la información del nodo de recepción solicitado (ej. `NodeRecepción eq 'QRC04269'`).
- **Autenticación**: Basic Auth gestionado mediante variables de entorno seguras (`ACUMATICA_USERNAME` / `ACUMATICA_PASSWORD`).

### 3. Sistema de Etiquetado QR
La generación de etiquetas está optimizada específicamente para impresoras **Zebra (Serie ZD)**.
- **Dimensiones**: Documentos configurados en `4x3 pulgadas` (101.6mm x 76.2mm).
- **Contenido**: El código QR encapsula el `LoteSerie`, permitiendo la trazabilidad completa del artículo en el almacén mediante scanners estándar.
- **Procesamiento**: Se realiza totalmente en el cliente para garantizar privacidad y velocidad de descarga.

---

## Arquitectura de Escalamiento (Future-Proof)

El proyecto contiene directorios "esqueleto" para los siguientes módulos:
- `crm`: Gestión de oportunidades y clientes.
- `accounting`: Control financiero.
- `analytics`: Paneles de KPIs y reporting empresarial.

Estas secciones están registradas en el router central (`app/routes.ts`), lo que permite que el sistema crezca orgánicamente sin necesidad de refactorizar la base del código. Actualmente, estos módulos sirven como placeholders para futuras implementaciones.

---

## Flujos de Trabajo (DevOps)

### Desarrollo y Ejecución
1. **Instalación**: `bun install`
2. **Desarrollo**: `bun run dev` (Inicia el server de Vite con soporte para Cloudflare).
3. **Producción**: El despliegue se activa automáticamente vía GitHub Actions al hacer push a `main`.

### Variables Críticas
El archivo `.env` debe incluir las credenciales de Acumatica y los tokens de Cloudflare para asegurar el correcto funcionamiento del bridge OData.
