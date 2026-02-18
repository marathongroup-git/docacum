---
sidebar_position: 0
---

**Elaboró:** Mauricio Isaac Hernández Hernández  
**Fecha:** 12 de febrero de 2026  
**Correo:** mhhernandez@marathongroup.mx  

# Introducción a N8N

Bienvenido a la documentación del proyecto N8N.

Aquí encontrarás los flujos de trabajo y automatizaciones configuradas para optimizar los procesos de Marathon.
# Reporte técnico


## ¿Por qué elegimos N8N?

N8N es una herramienta de automatización de flujos de trabajo extensible que permite conectar aplicaciones y servicios a través de API, webhook y lógica personalizada. Se seleccionó por las siguientes razones:

*   **Flexibilidad y Potencia**: Permite manipular datos complejos mediante nodos de función (JavaScript/TypeScript), algo esencial para nuestras reglas de negocio específicas.
*   **Conectividad**: Ofrece una amplia gama de nodos nativos y genericos (HTTP Request) para interactuar con casi cualquier servicio moderno.
*   **Auto-hospedaje (Self-hosted)**: Al poder alojar nuestra propia instancia, mantenemos el control total sobre los datos y la ejecución de los procesos.

## Infraestructura: Docker

Para desplegar la instancia de N8N, utilizamos **Docker**. Esta tecnología de contenedores nos permitió levantar el servicio de manera aislada y rápida, sin depender de configuraciones complejas de sistemas operativos Linux o servidores dedicados.

La simplicidad de Docker facilita que la instancia sea portátil y fácil de reiniciar o migrar si es necesario, garantizando que el entorno de ejecución sea siempre consistente.

## Integración mediante OData

Un aspecto crítico de nuestra implementación es la capacidad de N8N para interactuar con protocolos estándares como **OData** (Open Data Protocol).

Utilizamos solicitudes `HTTP Request` configuradas para realizar consultas `GET` vía OData a nuestros sistemas ERP (como Acumatica). Esto nos permite:
1.  Obtener listados de inventarios en tiempo real.
2.  Filtrar datos desde el origen para reducir la carga de procesamiento.
3.  Estandarizar la comunicación entre sistemas dispares de manera segura y eficiente.
