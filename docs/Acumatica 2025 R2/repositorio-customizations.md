---
title: Repositorio GitHub “solo código” para personalizaciones de Acumatica
description: Cómo separar el código fuente de App_Data\Projects en un repositorio limpio, con .gitignore y sincronización automatizada.
sidebar_position: 10
tags:
  - Acumatica
  - GitHub
  - Git
  - VS Code
  - Visual Studio
  - Control de versiones
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Repositorio GitHub “solo código” para personalizaciones de Acumatica

## Objetivo

Crear un **nuevo repositorio** en GitHub que contenga **únicamente el código fuente** de las personalizaciones de Acumatica ubicadas en:

`C:\Program Files\Acumatica ERP\MarathonDB\App_Data\Projects`

✅ Manteniendo **intacto el repositorio original** (sin modificarlo).  
✅ Evitando subir “basura” generada por Visual Studio/compilación (bin/obj/.vs, DLL/PDB, caches, etc.).  
✅ Habilitando un flujo simple para **sincronizar todo `Projects`** hacia el repo nuevo.

---

## Contexto inicial

Se identificó que en VS Code, dentro de **Source Control**, aparecían muchos cambios y archivos generados, por ejemplo:

- `.vs/` (índices/caché)
- `bin/Debug/*.dll`, `*.pdb` (salida de compilación)
- `obj/` (cachés de MSBuild/NuGet)
- `*.vsidx` (FileContentIndex)
- Archivos runtime/caché de Acumatica

Esto provoca repositorios “sucios”, commits ruidosos y posibles conflictos.

---

## Interpretación de la vista “Source Control” en VS Code

En el panel de control de versiones, los estados más relevantes son:

- **M (Modified)**: archivo modificado vs último commit.
- **U (Untracked)**: archivo nuevo que Git aún no rastrea.
- **D (Deleted)**: archivo eliminado localmente pero registrado en Git.

Además, el **Graph** muestra el historial de commits, merges y autores.

---

## Decisión técnica

En lugar de “limpiar” el repositorio original (que ya contiene runtime y archivos generados), se decidió:

:::tip
Crear un **repositorio nuevo** dedicado exclusivamente a **código fuente**, tomando como base únicamente la carpeta `App_Data\Projects`.
:::

---

## Implementación

### 1) Crear un folder de trabajo fuera de Program Files

Se creó un directorio de repositorios para evitar permisos/ruido del runtime:

`C:\Repos\AcumaticaCustomizations\`

> Recomendación: no trabajar Git directamente dentro de `C:\Program Files\...` por cambios constantes del sistema y del sitio.

---

### 2) Copiar Projects al nuevo folder

Origen:
`C:\Program Files\Acumatica ERP\MarathonDB\App_Data\Projects`

Destino:
`C:\Repos\AcumaticaCustomizations\Projects`

---

### 3) Crear `.gitignore` para evitar “basura”

Se agregó un `.gitignore` en la raíz del nuevo repo para excluir:

- `.vs/`
- `bin/`
- `obj/`
- `*.dll`, `*.pdb`
- `*.vsidx`, caches, logs, etc.

> Resultado esperado: el repositorio contiene el **source** (C#, csproj, sln, config, xml), pero no compilados ni índices.

---

### 4) Confirmar qué cuenta de GitHub se estaba usando en VS Code

En el menú **Accounts** de VS Code se validó que la sesión activa de GitHub era:

- **marathongroup-git (GitHub)** ✅  
- apolanco@marathongroup.mx (Microsoft)

Esto confirmó la identidad de la cuenta para crear y administrar el repositorio remoto.

---

### 5) Conectar el repositorio local a GitHub y publicar

Se configuró el remoto `origin` y se publicó la rama `main`:

```powershell
git remote add origin https://github.com/marathongroup-git/acumatica-customizations.git
git branch -M main
git push -u origin main
