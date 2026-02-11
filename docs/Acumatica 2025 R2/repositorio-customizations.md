---
title: Repositorio GitHub “solo código” para personalizaciones de Acumatica
description: Separación del código fuente de App_Data\Projects en un repositorio limpio, con .gitignore y sincronización automatizada (PS1 + BAT).
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

Con esto se buscó:

- Respetar el repositorio original (sin modificarlo).
- Evitar subir “basura” generada por Visual Studio y el proceso de compilación (bin/obj/.vs, DLL/PDB, caches, etc.).
- Tener un flujo repetible para mantener sincronizada la carpeta `Projects` con el repositorio nuevo.
- Documentar **todos los comandos ejecutados** y los **archivos de automatización** creados.

---

## Contexto inicial

En VS Code (panel **Source Control**) se detectó una gran cantidad de archivos generados que no deberían versionarse, por ejemplo:

- `.vs/` (índices/caché de Visual Studio)
- `bin/Debug/*.dll`, `*.pdb` (salida de compilación)
- `obj/` (cachés de MSBuild/NuGet)
- `*.vsidx` (FileContentIndex)

Esto provocaba un repositorio “sucio” con demasiados cambios irrelevantes.

---

## Interpretación rápida del panel Source Control (VS Code)

- **M (Modified)**: archivo modificado vs último commit.
- **U (Untracked)**: archivo nuevo que Git aún no rastrea.
- **D (Deleted)**: archivo eliminado localmente pero registrado en Git.

El panel **Graph** muestra commits, merges, autores y la rama actual (por ejemplo `main`).

---

## Decisión técnica

En lugar de “limpiar” el repositorio original, se decidió crear un repositorio nuevo “solo código” tomando como base únicamente:

`C:\Program Files\Acumatica ERP\MarathonDB\App_Data\Projects`

---

# Procedimiento realizado (detalle completo)

## 1) Crear estructura del nuevo repositorio (solo código)

### 1.1 Crear carpeta de trabajo fuera de Program Files

Se creó el directorio local del nuevo repositorio:

`C:\Repos\AcumaticaCustomizations\`

> Recomendación: mantener repos fuera de `C:\Program Files\...` para evitar permisos, locks y ruido generado por la ejecución del sitio.

### 1.2 Copiar la carpeta Projects al nuevo directorio

Se copió la carpeta `Projects` desde el sitio de Acumatica hacia el nuevo repositorio local:

- Origen:  
  `C:\Program Files\Acumatica ERP\MarathonDB\App_Data\Projects`

- Destino:  
  `C:\Repos\AcumaticaCustomizations\Projects`

---

## 2) Crear `.gitignore` para excluir “basura”

Se creó el archivo:

`C:\Repos\AcumaticaCustomizations\.gitignore`

Con reglas para ignorar archivos generados por Visual Studio/.NET y caches:

```gitignore
############################################
# Visual Studio / .NET build basura
############################################
**/.vs/
**/bin/
**/obj/
**/TestResults/
*.user
*.suo
*.cache
*.log
*.tmp
*.pdb
*.dll
*.exe
*.vsidx
**/FileContentIndex/

############################################
# (Opcional) Otros
############################################
node_modules/
.idea/
```

Nota importante: `.gitignore` evita que Git rastree archivos nuevos; si algo ya estuviera trackeado previamente, sería necesario “des-trackear” con `git rm --cached`. En este repositorio nuevo no fue necesario porque se creó desde cero.

---

## 3) Confirmar cuenta de GitHub utilizada en VS Code

En el menú **Accounts** de VS Code se confirmó la autenticación con:

- **marathongroup-git (GitHub)**  
- **apolanco@marathongroup.mx (Microsoft)**

La cuenta relevante para GitHub fue **marathongroup-git**.

---

## 4) Comandos ejecutados para enlazar con GitHub y publicar el repositorio

Todos estos comandos se ejecutaron dentro de:

`C:\Repos\AcumaticaCustomizations\`

### 4.1 Verificar si existía un remote configurado

```powershell
git remote -v
```

Resultado: no devolvió nada (no había remote aún).

### 4.2 Agregar el remote origin del repositorio nuevo

```powershell
git remote add origin https://github.com/marathongroup-git/acumatica-customizations.git
```

### 4.3 Asegurar la rama principal como `main`

```powershell
git branch -M main
```

### 4.4 Subir el repositorio a GitHub y establecer tracking

```powershell
git push -u origin main
```

Esto publicó `main` en GitHub y estableció seguimiento entre `main` (local) y `origin/main` (remoto).

### 4.5 Validar la configuración del remote

```powershell
git remote -v
```

Resultado esperado:

- `origin https://github.com/marathongroup-git/acumatica-customizations.git (fetch)`
- `origin https://github.com/marathongroup-git/acumatica-customizations.git (push)`

---

## 5) Validación final del estado del repositorio

```powershell
git status
```

Resultado logrado:

- `Your branch is up to date with 'origin/main'.`
- `nothing to commit, working tree clean`

Con esto se confirmó el repositorio limpio y sincronizado.

---

# Automatización creada para sincronizar TODO Projects al repositorio

Para mantener el repo actualizado con lo que cambie en el sitio de Acumatica, se crearon 2 archivos:

- `C:\Repos\AcumaticaCustomizations\sync-projects.ps1`
- `C:\Repos\AcumaticaCustomizations\sync-projects.bat`

---

## 6) Archivo: `sync-projects.ps1` (PowerShell)

**Ruta:**  
`C:\Repos\AcumaticaCustomizations\sync-projects.ps1`

**Propósito:**  
Sincronizar desde:

`C:\Program Files\Acumatica ERP\MarathonDB\App_Data\Projects`

Hacia:

`C:\Repos\AcumaticaCustomizations\Projects`

Excluyendo `.vs`, `bin`, `obj`, `FileContentIndex`, `*.vsidx`, `*.dll`, `*.pdb`, caches y logs; además, al final muestra `git status`.

**Nota técnica:** usa `/MIR` para mantener el destino como espejo (si algo ya no existe en origen, lo elimina del destino).

**Contenido completo del archivo:**

```powershell
# sync-projects.ps1
# Sincroniza App_Data\Projects (Acumatica) -> Repo Git (solo código)
# Ejecutar en PowerShell (idealmente NO como admin).

$source = "C:\Program Files\Acumatica ERP\MarathonDB\App_Data\Projects"
$dest   = "C:\Repos\AcumaticaCustomizations\Projects"

if (!(Test-Path $source)) {
    Write-Error "No existe la ruta origen: $source"
    exit 1
}

if (!(Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest | Out-Null
}

# Carpetas a excluir (basura típica de VS/.NET)
$excludeDirs = @(
    ".vs",
    "bin",
    "obj",
    "TestResults",
    "FileContentIndex",
    ".git"
)

# Archivos a excluir (binarios/caches)
$excludeFiles = @(
    "*.dll",
    "*.pdb",
    "*.exe",
    "*.vsidx",
    "*.cache",
    "*.log",
    "*.tmp",
    "*.dtbcache.json",
    "*.AssemblyReference.cache",
    "*.CoreCompileInputs.cache",
    "project.assets.json",
    "project.nuget.cache",
    "*.user",
    "*.suo"
)

$cmd = @(
    "`"$source`"",
    "`"$dest`"",
    "/MIR",
    "/FFT",
    "/Z",
    "/R:1",
    "/W:1",
    "/XJ",
    "/NP",
    "/NDL"
)

foreach ($d in $excludeDirs) { $cmd += "/XD"; $cmd += $d }
foreach ($f in $excludeFiles) { $cmd += "/XF"; $cmd += $f }

Write-Host "Sincronizando Projects..." -ForegroundColor Cyan
Write-Host "Origen : $source"
Write-Host "Destino: $dest"
Write-Host ""

$robocopy = Start-Process -FilePath "robocopy" -ArgumentList $cmd -NoNewWindow -Wait -PassThru

# Robocopy: 0-7 = OK; >=8 = error
$code = $robocopy.ExitCode
Write-Host ""
Write-Host "Robocopy ExitCode: $code"

if ($code -ge 8) {
    Write-Error "Robocopy reportó error (ExitCode >= 8). Revisa permisos/rutas."
    exit $code
}

Write-Host "Sincronización completada." -ForegroundColor Green

# Opcional: mostrar estado de Git
Push-Location "C:\Repos\AcumaticaCustomizations"
git status
Pop-Location
```

---

## 7) Archivo: `sync-projects.bat` (doble clic)

**Ruta:**  
`C:\Repos\AcumaticaCustomizations\sync-projects.bat`

**Propósito:**  
Ejecutar `sync-projects.ps1` con doble clic, usando `ExecutionPolicy Bypass` y dejando la ventana abierta al final.

**Contenido completo del archivo:**

```bat
@echo off
setlocal

cd /d "C:\Repos\AcumaticaCustomizations"

REM Ejecuta el script de PowerShell sin pedir confirmaciones
powershell -NoProfile -ExecutionPolicy Bypass -File ".\sync-projects.ps1"

echo.
echo Listo. Presiona una tecla para cerrar...
pause >nul
endlocal
```

---

# Operación diaria recomendada (uso del flujo)

## 8) Sincronizar Projects → Repo local

Opción 1 (recomendada por facilidad):  
Doble clic sobre:

`C:\Repos\AcumaticaCustomizations\sync-projects.bat`

Opción 2 (manual en PowerShell):

```powershell
cd C:\Repos\AcumaticaCustomizations
.\sync-projects.ps1
```

## 9) Revisar cambios detectados por Git

```powershell
git status
```

## 10) Confirmar cambios y subir al repo GitHub

```powershell
git add .
git commit -m "Sync Projects from Acumatica site"
git push
```

---

# Beneficios obtenidos

- Repositorio “solo código” limpio y auditable.
- Se evita subir binarios, caches, índices y temporales.
- Se conserva el repositorio original intacto.
- Se cuenta con sincronización automática repetible (PS1 + BAT).
- Flujo diario claro: sincronizar → revisar → commit → push.

---

# Recomendaciones finales

- Mantener repos fuera de `C:\Program Files\...` para evitar bloqueos/permisos.
- Tener presente que `/MIR` (Robocopy) mantiene espejo completo:
  - si se elimina algo en origen, se eliminará en destino.
  - si se requiere conservar históricos en destino, cambiar `/MIR` por `/E`.

---

# Referencias internas (rutas y repositorio)

- Origen (sitio Acumatica):  
  `C:\Program Files\Acumatica ERP\MarathonDB\App_Data\Projects`

- Repositorio nuevo (local):  
  `C:\Repos\AcumaticaCustomizations\`

- Carpeta sincronizada (destino):  
  `C:\Repos\AcumaticaCustomizations\Projects`

- Repo GitHub remoto:  
  `https://github.com/marathongroup-git/acumatica-customizations.git`

- Archivos creados:  
  `C:\Repos\AcumaticaCustomizations\.gitignore`  
  `C:\Repos\AcumaticaCustomizations\sync-projects.ps1`  
  `C:\Repos\AcumaticaCustomizations\sync-projects.bat`
