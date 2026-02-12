---
id: reporte-instalacion-docusaurus-ghpages
title: Reporte — Instalación y Publicación de Docusaurus en GitHub Pages
slug: /reporte/docusaurus-github-pages
sidebar_position: 1
description: Informe detallado de todo lo realizado para crear, configurar y publicar el sitio Docusaurus (JS) del proyecto docacum en GitHub Pages usando GitHub Actions y npm.
---

# 1. Resumen ejecutivo

Este reporte documenta **todo lo que se hizo bien** para instalar y publicar un sitio **Docusaurus v3 (JavaScript)** en **GitHub Pages** para el repositorio **docacum** de **marathongroup-git**. Se incluyen **instrucciones, comandos, scripts y archivos de configuración** que permitieron lograr un despliegue **reproducible**, **automatizado** y **alineado a buenas prácticas**.

**Puntos clave logrados:**

- Uso de **Node.js ≥ 18** (requerimiento de Docusaurus v3).
- Creación del proyecto en **JavaScript** con el **template classic**.
- Inicialización del repositorio **Git** y push a **GitHub** (rama `main`).
- Configuración correcta de **`docusaurus.config.js`** (`url`, `baseUrl`, etc.).
- Habilitación de **GitHub Pages** con **Source = GitHub Actions**.
- Flujo de **CI/CD** con **npm** (`npm ci` + `npm run build`) y acciones oficiales **upload-pages-artifact** + **deploy-pages**.
- Validaciones de **troubleshooting** más comunes (lockfile, baseUrl, rutas de imágenes, caché).

---

# 2. Preparación del entorno

## 2.1. Requisitos
- **Git** instalado:
  ```bash
  git --version
  ```
- **Node.js 18 o superior**:
  ```bash
  node -v
  ```

## 2.2. Justificación
- Docusaurus v3 requiere Node 18+.
- El flujo de CI con GitHub Actions se beneficia del lockfile (`package-lock.json`) cuando usamos **npm** (`npm ci`), asegurando instalaciones deterministas y rápidas con caché.

---

# 3. Creación del proyecto Docusaurus (JavaScript)

En una terminal, en la carpeta donde se alojará el proyecto:

```bash
npx create-docusaurus@latest docacum classic --javascript
cd docacum
```

Prueba local del dev server:

```bash
npm run start
# Abre http://localhost:3000
```

> Resultado esperado: el sitio se levanta en modo desarrollo con hot reload.

---

# 4. Control de versiones e integración con GitHub

## 4.1. Inicializar Git y primer commit
```bash
git init
git add .
git commit -m "feat: proyecto Docusaurus (JS) inicial"
git branch -M main
```

## 4.2. Crear el repositorio en GitHub
- Repositorio **público**: `marathongroup-git/docacum` (vacío, sin README).

## 4.3. Conectar el remoto y subir
```bash
git remote add origin https://github.com/marathongroup-git/docacum.git
git push -u origin main
```

> Alternativa SSH (si las llaves están configuradas): `git@github.com:marathongroup-git/docacum.git`

---

# 5. Configuración de Docusaurus para GitHub Pages

Se ajustaron los campos críticos en **`docusaurus.config.js`**:

```js title="docusaurus.config.js (extracto)"
export default {
  // ...
  url: 'https://marathongroup-git.github.io', // host base
  baseUrl: '/docacum/',                       // nombre del repo con '/' inicial y final
  organizationName: 'marathongroup-git',      // usuario/organización de GitHub
  projectName: 'docacum',                     // repositorio
  trailingSlash: false,                       // buena práctica para Pages
  // deploymentBranch: 'gh-pages',            // innecesario usando Actions
  // ...
};
```

**Buenas prácticas aplicadas:**
- `url` + `baseUrl` coherentes con **Project Pages** (ruta final: `/docacum/`).
- `trailingSlash: false` para evitar redirecciones ambiguas en Pages.
- Evitar `deploymentBranch` cuando se usa **GitHub Actions** (el flujo moderno despliega artefactos de Pages).

---

# 6. Habilitar GitHub Pages con GitHub Actions

En el repositorio **Settings → Pages → Build and deployment → Source**, se seleccionó **GitHub Actions**.

**Ventajas del enfoque con Actions:**
- Desacopla el contenido del site de la rama `gh-pages`.
- Evita tener que instalar SSH/credenciales en local para publicar.
- Permite despliegue automático con cada commit/push a `main`.

---

# 7. Flujo de CI/CD con npm (workflow)

Se añadió **`.github/workflows/deploy.yml`** con el siguiente contenido:

```yaml title=".github/workflows/deploy.yml"
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]  # despliega al hacer push a main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm   # usa package-lock.json para cache

      - name: Install deps
        run: npm ci   # si no hay package-lock.json, usar temporalmente: npm install

      - name: Build
        run: npm run build

      - name: Upload Build Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Decisiones acertadas del workflow:**
- `cache: npm` para acelerar instalaciones.
- `npm ci` para instalaciones **reproducibles** (si existe `package-lock.json`).
- Separación de **build** y **deploy** con acciones oficiales de **Pages**.

---

# 8. Verificación y criterios de aceptación

## 8.1. Pipeline en verde
- Revisar **Actions** y confirmar que el job **“Deploy to GitHub Pages”** concluyó **OK**.

## 8.2. Sitio publicado
- URL esperada: `https://marathongroup-git.github.io/docacum/`

## 8.3. Pruebas funcionales mínimas
- Navegación por páginas del template.
- Carga de assets (CSS/JS).  
- Comprobación de rutas con `baseUrl` (especialmente en **GitHub Pages**).

---

# 9. Gestión de imágenes y rutas (buenas prácticas aplicadas)

- **`static/`** para imágenes “globales” → referencia con rutas absolutas:  
  `![alt](/img/mi-ruta/imagen.png)` (Docusaurus antepone `baseUrl`).
- **Co-localización** junto al doc para versionado → rutas relativas:  
  `![alt](./img/imagen.png)`
- Nombres en **minúsculas**, formatos optimizados (PNG/JPG/WebP/SVG), evitar archivos > 5–10 MB.

---

# 10. Troubleshooting aplicado y preventivo

- **Lockfile**: si aparece un aviso tipo “Dependencies lock file is not found…”, se usa **npm** con `package-lock.json` o se cambia a `npm install` la primera vez para generarlo.
- **`baseUrl` incorrecto**: estilos/JS 404 → verificar `baseUrl: '/docacum/'` para Project Pages.
- **Node version**: errores de build con versiones antiguas → fijar **Node 18** en `setup-node@v4` y localmente.
- **Rutas de imágenes**: usar `/img/...` (global) o `./img/...` (relativa) según estrategia.

---

# 11. Archivos de apoyo (plantillas)

Se incluyen en este paquete:

- **`.github/workflows/deploy.yml`** — workflow completo para npm.
- **`docusaurus.config.js`** — plantilla lista para `docacum`.
- **`README.quickstart.md`** — guía rápida de comandos.

---

# 12. Lecciones aprendidas

- **Elegir npm** simplificó el cache y el lockfile en Actions.
- **Actions para Pages** es más mantenible que publicar desde local.
- Ajustar **`url`** y **`baseUrl`** al inicio evitó errores de assets.
- Mantener **consistencia de versiones** (Node 18) entre local y CI evita sorpresas.

---

# 13. Próximos pasos sugeridos

- Crear **plantillas de documentación** (intro, cambios por pantalla, bitácoras).
- Agregar **versionado de docs** si se requiere documentación histórica por release.
- Configurar **previews** por PR (acciones de vercel/netlify o GH Pages con branches).

---

_Reporte generado el 2026-02-12._
