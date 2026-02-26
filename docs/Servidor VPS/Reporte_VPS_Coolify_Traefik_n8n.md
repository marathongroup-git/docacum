# Reporte técnico — VPS MarathonGroup (Coolify + Traefik + n8n)  
**Última actualización:** 2026-02-26 17:44 UTC  
**Elaboró:** Alberto Polanco  
**Fecha:** 26 de febrero de 2026  
**Correo:** apolanco@marathongroup.mx  
 

> **Objetivo del documento**  
> Dejar un “estado actual” claro y reutilizable (por TI y por futuras conversaciones con ChatGPT) de cómo quedó configurado el VPS para **publicar múltiples apps** de forma ordenada, evitando choques de puertos/proxy/certificados.  
> Incluye: inventario de componentes, puertos, redes, flujos y lineamientos para agregar nuevas aplicaciones.

---

## 0) Resumen ejecutivo (1 minuto)

En el VPS existen **dos capas de publicación**:

1) **Coolify (principal)**  
   - Coolify administra despliegues (n8n, Odoo, etc.) y usa un reverse proxy propio (**`coolify-proxy`** basado en **Traefik**) que escucha en **80/443**.  
   - Coolify genera reglas de enrutamiento automáticamente (por “Domains” en cada app).  
   - Es el camino recomendado para “apps productivas” y para simplificar certificados.

2) **Traefik “infra” (secundario / laboratorio)**  
   - Se levantó un Traefik adicional llamado **`traefik-infra`** para poder publicar servicios “fuera” del mecanismo de Coolify **sin romper producción**, usando el **provider Docker** y un filtro por etiqueta.  
   - Publica por puertos alternos (**8081/8443**) para no interferir con 80/443.

Con esto, puedes:
- Seguir usando Coolify para la mayoría de apps (recomendado).
- Publicar apps especiales (o pruebas) por `traefik-infra` sin tocar `coolify-proxy`.

---

## 1) Datos del servidor (confirmados por consola)

- **VPS:** Ubuntu 24.04 (Hostinger) *(según contexto del proyecto)*  
- **IP pública del VPS:** `86.38.205.142` *(comando: `curl -4 ifconfig.me`)*  
- **Docker Compose plugin:** `Docker Compose version v5.0.0` *(comando: `docker compose version`)*

> Nota: este reporte no incluye hardening del SO (UFW/fail2ban/SSH) salvo recomendaciones. Si lo quieres, lo agregamos luego.

---

## 2) Dominios y DNS (modo actual)

### 2.1 Dominio de pruebas rápido (nip.io)
Se está usando la convención nip.io, que resuelve un host al IP embebido:

- **Host de prueba:** `bot.86.38.205.142.nip.io`
- **Resolución validada:** `getent hosts bot.86.38.205.142.nip.io` → `86.38.205.142`

Ventaja: no requiere tocar DNS corporativo.  
Uso típico: pruebas rápidas de reverse proxy y certificados (aunque *Let’s Encrypt real* depende de cómo se expongan puertos).

### 2.2 Dominio corporativo (marathongroup.mx) — recomendado a futuro
Para producción, lo ideal es crear registros tipo **A** en tu DNS (donde administres `marathongroup.mx`) apuntando a `86.38.205.142`, por ejemplo:

- `n8n.marathongroup.mx` → `86.38.205.142`
- `odoo.marathongroup.mx` → `86.38.205.142`
- `bot.marathongroup.mx` → `86.38.205.142`

Esto permite certificados estándar y URLs “limpias”.

---

## 3) Componentes principales (inventario)

### 3.1 Coolify
- **Versión UI observada:** `v4.0.0-beta.442`
- Proyectos visibles: **“N8N project”**, **“Odoo”**
- Coolify administra despliegues y genera routing al proxy.

### 3.2 Reverse proxy principal (Coolify)
- Contenedor: **`coolify-proxy`**
- Imagen: `traefik:v3.1` *(observado en `docker ps`)*  
- Puertos publicados (observados):
  - `0.0.0.0:80->80/tcp`
  - `0.0.0.0:443->443/tcp`
  - `0.0.0.0:443->443/udp` (HTTP/3)
- Config importante observada:
  - provider **file**: `--providers.file.directory=/traefik/dynamic/` (Coolify genera reglas ahí)
  - Let’s Encrypt: `--certificatesresolvers.letsencrypt.acme.httpchallenge=true` + storage `/traefik/acme.json`
  - API insecure deshabilitada: `--api.insecure=false`

**Implicación:**  
Para la mayoría de apps, basta con crear la app en Coolify y definir “Domains”; Coolify se encarga de publicar vía `coolify-proxy`.

### 3.3 Reverse proxy secundario (Traefik Infra / laboratorio)
Se creó un stack adicional para “infra routing”:

- Carpeta: `/home/polanco/infra-traefik/`
- Archivo: `/home/polanco/infra-traefik/docker-compose.yml`
- Servicio: `traefik-infra`
- Imagen actual (según acciones): `traefik:v3.6.9`
- Puertos publicados (observados en `docker ps`):
  - `8081:8081` (HTTP del infra-traefik)
  - `8443:8443` (HTTPS del infra-traefik)
  - `8082:8080` (Dashboard/API Traefik del infra-traefik)

#### 3.3.1 Configuración clave de `traefik-infra`
- `--providers.docker=true`
- `--providers.docker.exposedbydefault=false`
- **Filtro por etiqueta (muy importante):**  
  `--providers.docker.constraints=Label(\`traefik.infra\`,\`true\`)`  

Esto evita que `traefik-infra` “vea” todos los contenedores y se meta con los de Coolify/n8n (que ya traen reglas y resolvers distintos).

- `docker.sock` montado **read-only**:  
  `/var/run/docker.sock:/var/run/docker.sock:ro`
- Red usada: **`coolify`** (external)

> Estado actual: `traefik-infra` ya arranca sin errores críticos y puede ver únicamente contenedores etiquetados con `traefik.infra=true`.

---

## 4) Redes Docker (estado lógico)

- Existe una red Docker llamada **`coolify`** marcada como `external: true` (usada por Coolify y por `traefik-infra`).
- Ejemplo observado: el contenedor de prueba (`nginxdemos/hello`) obtuvo IP dentro de esa red: `10.0.1.10`.

**Regla de oro para publicar apps:**  
> La app y el proxy que la publica deben estar en la **misma red** Docker (en este caso, `coolify`).

---

## 5) Puertos del VPS (visión de conjunto)

### 5.1 Puertos “productivos” (no mover)
- **80/tcp** → lo usa `coolify-proxy`
- **443/tcp + 443/udp** → lo usa `coolify-proxy`

### 5.2 Puertos “infra/lab” (evitar exposición pública si no se necesita)
- **8081/tcp** → `traefik-infra` HTTP
- **8443/tcp** → `traefik-infra` HTTPS
- **8082/tcp** → Dashboard/API de `traefik-infra`

**Recomendación de seguridad:**  
Si vas a dejar 8081/8443/8082 accesibles, limita por firewall (UFW) a tu IP de administración.  
Lo ideal: que el “mundo” solo vea 80/443.

---

## 6) Prueba de publicación (hello-infra)

Para validar que `traefik-infra` está leyendo Docker labels filtradas, se levantó un contenedor “hello” con etiquetas explícitas, por ejemplo:

- `traefik.infra=true`
- `traefik.enable=true`
- `traefik.http.routers.hello-infra.rule=Host(\`bot.86.38.205.142.nip.io\`)`
- `traefik.http.routers.hello-infra.entrypoints=http`
- `traefik.http.services.hello-infra.loadbalancer.server.port=80`

Y se validó localmente con:

- `curl -i http://127.0.0.1:8081 -H "Host: bot.86.38.205.142.nip.io"` → `200 OK` (NGINX)

En navegador se observó:
- `http://bot.86.38.205.142.nip.io:8081` → página de NGINX (OK)

> Nota: si el navegador muestra “No seguro” en 8081 es normal: ahí es HTTP.  
> Para HTTPS en `traefik-infra` sería por 8443 y depende de cómo se gestione el certificado (ver sección 7).

---

## 7) Certificados TLS (estado y recomendaciones)

### 7.1 Coolify-proxy (principal)
- Maneja Let’s Encrypt en 80/443.  
- Es el camino recomendado para **certificados públicos** en dominios productivos.

### 7.2 Traefik-infra (secundario)
Actualmente tiene configuración de ACME, pero **ojo**:

- Si el challenge es HTTP, Let’s Encrypt normalmente valida por **puerto 80** público.  
- `traefik-infra` no está en 80, está en 8081.  
- Por lo tanto, **no asumas** que emitirá certificados públicos con ese método a menos que:
  - uses **DNS challenge** (recomendado para un proxy “secundario”), o
  - redirijas/reenrutes el challenge desde 80 hacia 8081 (complica y puede chocar con Coolify).

**Recomendación práctica:**
- Producción: certificados por **Coolify-proxy** en 443.
- Lab/infra: usar HTTP (8081) o restringir acceso; si requieres TLS real, usar DNS challenge o un dominio/subdominio dedicado.

---

## 8) Cómo agregar nuevas apps en el futuro (sin romper nada)

### Camino recomendado (normal): “Coolify-first”
**Usa Coolify** para desplegar apps (Docker image / repo / compose).  
Luego:
1) En la app → define **Domains** (`appX.marathongroup.mx` o `appX.86.38.205.142.nip.io`)
2) Coolify actualiza reglas del `coolify-proxy`.
3) Certificados automáticos (si el dominio apunta al VPS y 80/443 están abiertos).

**Ventajas**
- Menos piezas, menos sorpresas.
- Certificados “bien” con Let’s Encrypt.
- Centralizado para TI.

### Camino alterno (para casos especiales): “traefik-infra”
Úsalo cuando:
- Quieras publicar algo **sin** meterlo a Coolify.
- Necesites reglas avanzadas o un gateway separado.

Checklist:
1) El contenedor/app debe estar en la red `coolify`.
2) Agrega etiqueta `traefik.infra=true`.
3) Agrega `traefik.http.routers.<name>.rule=Host(\`...\`)`.
4) Agrega `traefik.http.routers.<name>.entrypoints=http` (8081) o `https` (8443).
5) Agrega `traefik.http.services.<name>.loadbalancer.server.port=<puerto_interno>`.

**Regla de oro:**  
> No uses 80/443 para `traefik-infra` mientras Coolify-proxy sea el principal.

---

## 9) n8n: endpoint interno y ejemplo de seguridad (contexto de proyecto)

Se implementó (o se probó) un endpoint HTTP vía Webhook en n8n, y se reforzó con un header tipo token:

- Header de seguridad usado en pruebas: `x-marathon-token: <token>`
- Endpoint: `/webhook/oc-po-lookup` (en test se vio `/webhook-test/oc-po-lookup`)

Esto permite que una integración externa (Teams/Bot/servicio) llame n8n sin exponerlo “abierto”.

**Buenas prácticas:**
- Guardar el token como **secreto** (Coolify env var / n8n credentials).
- Rotarlo periódicamente.
- Loggear `from`, `timestamp`, `IP` y `messageId` (si viene de Teams/Graph).

---

## 10) Troubleshooting (lo más útil para futuro)

### 10.1 404 en el dominio
Causas típicas:
- La regla Host/Router no existe en el proxy que estás consultando.
- El contenedor no está en la red correcta.
- Estás pegándole al proxy equivocado (80/443 vs 8081/8443).

Diagnóstico rápido:
- `docker ps --format "table {.Names}	{.Image}	{.Ports}" | grep -E "coolify-proxy|traefik-infra"`
- `curl -i http://127.0.0.1:8081 -H "Host: <dominio>" | head`
- `curl -I http://127.0.0.1:80 -H "Host: <dominio>"`

### 10.2 Ver rutas cargadas en traefik-infra
- `curl -s http://127.0.0.1:8082/api/http/routers | jq`

### 10.3 Confirmar que una app está en la red `coolify`
- `docker inspect <container> --format '{json .NetworkSettings.Networks}' | jq`

### 10.4 Confirmar labels de una app
- `docker inspect <container> -f '{json .Config.Labels}' | jq`

---

## 11) Recomendación de arquitectura “a prueba de crecimiento”

Para un VPS donde irás agregando más apps (no solo n8n), la estrategia más estable es:

1) Mantener **un único “ingress” productivo** en 80/443  
   - En tu caso: **Coolify-proxy** (Traefik) como frontal.
2) Publicar apps productivas **siempre** por Coolify y sus “Domains”.
3) Reservar `traefik-infra` para:
   - pruebas,
   - apps externas a Coolify,
   - o casos donde quieras rutas especiales.
4) Mantener **una red estándar** (`coolify`) y conectar ahí todo lo que vaya a ser accesible por proxy.

---

## 12) Qué queda pendiente / por confirmar (para que el documento sea “vivo”)

Este reporte se basa en lo observado en capturas y comandos compartidos. Para dejarlo 100% cerradito, conviene capturar y anexar:

- `docker network inspect coolify` (para documentar subred exacta)
- `docker ps` completo (inventario de contenedores)
- `docker compose ls` (stacks activos)
- `ss -ltnp` (puertos expuestos)
- Inventario de dominios configurados en Coolify (n8n, odoo, etc.)

Si lo quieres, te paso un bloque de comandos que genera un “snapshot” en un solo archivo.

---

# Apéndice A — docker-compose.yml observado (traefik-infra)

> Nota: este apéndice es “de referencia” y puede variar si lo sigues editando.

- Puertos: `8081`, `8443`, `8082`
- Red: `coolify` externa
- Providers: docker (filtrado por `traefik.infra=true`)
- Cert resolver: `le` (pendiente validar si se usará en producción con DNS challenge)

---

