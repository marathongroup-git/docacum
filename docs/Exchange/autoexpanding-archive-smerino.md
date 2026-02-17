---
id: autoexpanding-archive-smerino
title: "Auto-Expanding Archive en Exchange Online (Buzón Logística)"
sidebar_position: 10
---

# Reporte técnico

**Elaboró:** Erika Amaro Camargo  
**Fecha:** 17 de febrero de 2026  
**Correo:** eamaro@marathongroup.mx  

---

## 1. Objetivo

Habilitar **Auto-Expanding Archive** (Archivado con expansión automática) para el buzón de Logística, con el fin de:

- Evitar saturación del **Archivo en línea** (Online Archive) cuando se aproxima a 100 GB.
- Mantener el archivado automático funcionando (MRM / Retención heredada de Exchange) sin interrupciones por cuota.
- Reducir tareas manuales de “mover correos” para liberar espacio.

Buzón objetivo: `smerino@marathongroup.mx`

---

## 2. Alcance

Este procedimiento aplica a:

- Tenant de **Microsoft 365** con **Office 365 E3**.
- **Exchange Online**.
- Archivado habilitado en el buzón objetivo.
- Ejecución desde estación Windows con PowerShell y conectividad a Microsoft 365.

No incluye:

- Cambios de políticas MRM (por ejemplo, pasar de 2 años a 12 meses).
- Automatizaciones externas (Power Automate / n8n) para mover correos entre buzones.

---

## 3. Resultado final (validación)

- **AutoExpandingArchiveEnabled (Organización):** `True`
- **ArchiveStatus (Buzón):** `Active`
- **AutoExpandingArchiveEnabled (Buzón):** `True`

Esto habilita que el archivo del buzón pueda expandirse por segmentos conforme se aproxima a umbrales de uso (normalmente alrededor de 90 GB), evitando quedar “topado” permanentemente en 100 GB.

> Nota operativa: la expansión no necesariamente es inmediata; puede tardar en provisionarse capacidad adicional.

---

## 4. Prerrequisitos

### 4.1 Permisos
La cuenta administradora utilizada debe contar, como mínimo, con permisos para administrar Exchange Online (por ejemplo rol de administrador de Exchange u equivalente).

### 4.2 Requerimientos de estación (Windows)
- PowerShell disponible (Windows PowerShell 5.1 fue usado).
- Acceso a instalar módulos (CurrentUser).
- Permitir ejecución de módulos firmados o de origen confiable (ExecutionPolicy por usuario).

---

## 5. Procedimiento ejecutado (paso a paso)

### 5.1 Verificar versión de PowerShell
```powershell
$PSVersionTable.PSVersion
```

Salida observada (referencia):
- Major: 5
- Minor: 1

### 5.2 Instalar proveedor NuGet (resolución de error)
Al instalar el módulo, PowerShell solicitó el proveedor NuGet. Se instaló explícitamente:

```powershell
Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force
```

Resultado esperado: proveedor `nuget` instalado.

### 5.3 Instalar módulo ExchangeOnlineManagement
Se instaló/actualizó el módulo con `-AllowClobber` para evitar conflictos de comandos:

```powershell
Install-Module ExchangeOnlineManagement -Scope CurrentUser -Force -AllowClobber
```

### 5.4 Ajustar Execution Policy (CurrentUser)
El módulo no se cargaba por política de ejecución restringida. Se aplicó:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### 5.5 Importar módulo y conectar a Exchange Online
```powershell
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

Resultado esperado: autenticación correcta y sesión conectada.

---

## 6. Habilitación de Auto-Expanding Archive

### 6.1 Verificar estado global de la organización
```powershell
Get-OrganizationConfig | Format-List AutoExpandingArchiveEnabled
```

Estado antes del cambio:
- `AutoExpandingArchiveEnabled : False`

### 6.2 Habilitar Auto-Expanding Archive a nivel organización
**Nota importante:** en Exchange Online este cmdlet se habilita mediante un *switch* (sin `$true/$false`).

```powershell
Set-OrganizationConfig -AutoExpandingArchive
```

### 6.3 Confirmar estado global (post-cambio)
```powershell
Get-OrganizationConfig | Format-List AutoExpandingArchiveEnabled
```

Estado esperado:
- `AutoExpandingArchiveEnabled : True`

---

## 7. Habilitar Auto-Expanding Archive en el buzón objetivo

### 7.1 Marcar buzón para Auto-Expanding Archive
```powershell
Enable-Mailbox -Identity "smerino@marathongroup.mx" -AutoExpandingArchive
```

Resultado esperado: comando ejecuta sin error y muestra detalles del buzón.

### 7.2 Validar estado del buzón
```powershell
Get-Mailbox -Identity "smerino@marathongroup.mx" | Format-List ArchiveStatus,AutoExpandingArchiveEnabled
```

Estado esperado:
- `ArchiveStatus : Active`
- `AutoExpandingArchiveEnabled : True`

---

## 8. Cierre de sesión
```powershell
Disconnect-ExchangeOnline -Confirm:$false
```

---

## 9. Lecciones aprendidas / Qué hicimos bien

1. **Validación previa:** confirmamos el estado global (`False`) antes de habilitarlo.
2. **Habilitación correcta del parámetro:** se corrigió el intento inicial con `-AutoExpandingArchiveEnabled $true` (parámetro no válido) y se usó el *switch* correcto `-AutoExpandingArchive`.
3. **Validación posterior (global y por buzón):** se confirmaron ambas banderas en `True` y el archivo en `Active`.
4. **Control de riesgos operativos:** se revisó el porcentaje de uso del archivo (~85%) y se consideró la expansión como mitigación antes de reducir retención (12 meses).
5. **Resolución ordenada de errores de entorno:** se solucionó de manera controlada:
   - instalación de NuGet,
   - conflicto de comandos con `-AllowClobber`,
   - política de ejecución con `RemoteSigned` a nivel **CurrentUser** (no a nivel máquina).

---

## 10. Consideraciones operativas

- Aunque Auto-Expanding Archive esté habilitado, es recomendable **mantener margen** (evitar pegarse al 99–100% del archivo principal), especialmente mientras se provisionan expansiones.
- Si se cambia la retención (por ejemplo, de 2 años a 12 meses), el archivo puede crecer más rápido. Se recomienda hacerlo **cuando exista colchón suficiente** o cuando la expansión ya esté estable.
- Los avisos de “archivo casi lleno” pueden continuar temporalmente si el archivo vuelve a acercarse al umbral de advertencia mientras se provisiona capacidad adicional.

---

## 11. Reversibilidad / Rollback (si se requiere)

> **Nota:** deshabilitar la característica global evita nuevas expansiones, pero no está diseñado para “reducir” instantáneamente el almacenamiento ya aprovisionado.

### 11.1 Deshabilitar a nivel organización (si política interna lo requiere)
```powershell
Set-OrganizationConfig -AutoExpandingArchive:$false
```

### 11.2 Deshabilitar a nivel buzón (si se requiere)
```powershell
Disable-Mailbox -Identity "smerino@marathongroup.mx" -AutoExpandingArchive
```

> Usar rollback únicamente si hay una razón clara (política/licenciamiento/compliance).

---

## 12. Referencias técnicas (Microsoft)

```text
- Enable auto-expanding archiving (Microsoft Learn)
- Enable archive mailboxes (Microsoft Learn)
- Set-OrganizationConfig (Exchange PowerShell) (Microsoft Learn)
- Connect to Exchange Online PowerShell (Microsoft Learn)
```
