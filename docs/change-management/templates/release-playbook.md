---
id: template-release-playbook
title: Template — Release Playbook
slug: /acumatica/change-management/templates/release-playbook
sidebar_position: 22
---

# Release Playbook

## Preparación
- [ ] Confirmar ventana y responsables
- [ ] Snapshot del tenant destino
- [ ] Export del ZIP de Customization
- [ ] Verificar prerequisitos (permisos, conexiones)

## Ejecución
1. Comunicar inicio a interesados
2. Publicar ZIP en ambiente objetivo
3. Validar logs y finalizar publicación
4. Ejecutar smoke tests (lista anexa)
5. Comunicar resultado

## Backout
- Pasos para despublicar/revertir
- Validar restauración de snapshot

## Validación Final
- [ ] Casos críticos de negocio OK
- [ ] Monitoreo 24‑48h
- [ ] Actualizar CHANGELOG
