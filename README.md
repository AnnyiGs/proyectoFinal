# MicroTasks — Proyecto

MicroTasks es un proyecto educativo para aprender una arquitectura de microservicios con contenerización y orquestación local. Incluye dos microservicios simples y ejemplos de cómo levantar, probar y registrar errores.

---

## Resumen rápido

- Tasks-Service (Puerto 3000): CRUD de tareas, notifica a notify-service, expone métricas en /metrics.  
- Notify-Service (Puerto 4001): Recibe notificaciones POST /notify, guarda logs, expone /metrics.  
- Comunicación: HTTP/JSON entre servicios (Axios + Express).  
- Contenerización: Docker y Docker Compose (Kubernetes en progreso).

---

## Requisitos

- Windows 10/11
- Node.js
- Docker y Docker Compose
- (Opcional) kubectl para pruebas en cluster

---

## Cómo ejecutar local (sin Docker)

1. Tasks:
   - cd tasks-service
   - npm install
   - node index.js
2. Notify:
   - cd notify-service
   - npm install
   - node index.js

---

## Cómo ejecutar con Docker Compose (recomendado para pruebas)

Desde la raíz del proyecto:

- Construir y levantar:
  - PowerShell / CMD:
    - docker-compose up --build
  - Para ejecutar en segundo plano:
    - docker-compose up -d --build
- Parar y eliminar contenedores:
  - docker-compose down

---

## Flujo de pruebas (básico)

1. Levantar servicios (ver instrucciones Docker Compose arriba).  
2. Crear una tarea (correcta):
   - POST http://localhost:3000/tasks
   - Body ejemplo:
     {
       "title": "Tarea de prueba",
       "description": "Descripción"
     }
3. Generar prueba de error (ejemplo):
   - Apagar notify-service o simular error en /notify y luego POST /tasks para ver manejo de timeout/errores.  
4. Revisar logs:
   - Logs de cada servicio en su salida de consola o en Docker logs:
     - docker-compose logs tasks-service
     - docker-compose logs notify-service

---

## Pruebas automatizadas / scripts útiles

- Ejecutar tests unitarios (si están presentes):
  - cd tasks-service && npm test
  - cd notify-service && npm test
- Script de prueba manual (curl / PowerShell Invoke-RestMethod) — ejemplo:
  - PowerShell:
    - Invoke-RestMethod -Method Post -Uri http://localhost:3000/tasks -Body (@{ title="t1"; description="d1" } | ConvertTo-Json) -ContentType 'application/json'

---

## Pruebas visuales (imágenes)

Las imágenes de la carpeta `imagenes` muestran pasos concretos para levantar contenedores y ejecutar pruebas (correctas y con errores). Colocar imágenes en ./imagenes para que se rendericen en este README.

Ejemplos de referencias (reemplazar nombres si difieren):

- Levantar contenedores:
  ![Levantar contenedores](imagenes/start-containers.png)

- Prueba correcta (POST /tasks con respuesta 200/201):
  ![Prueba correcta](imagenes/test-success.png)

- Prueba con error (timeout / notify-service caído):
  ![Prueba con error](imagenes/test-error.png)

Si los nombres de archivo no coinciden, abrir la carpeta `imagenes` y ajustar las rutas arriba.

Ruta local de la carpeta de imágenes (Windows):
- c:\Users\anyio\Desktop\microtasks\imagenes

---

## Notas de operación y depuración

- Ajustar variables de entorno en docker-compose o en los Dockerfiles si necesita cambiar puertos o timeouts.
- Revisar /metrics en ambos servicios para datos de instrumentación.
- Para reproducir errores de red en entorno Docker, detener sólo notify-service y volver a ejecutar peticiones a tasks-service.

---

## Estado y próximos pasos

- Docker Compose: completo y funcional.  
- Kubernetes: en progreso (manifiestos generados, diagnóstico de conectividad).  
- Próximos pasos: monitoreo (Prometheus / Grafana), CI/CD y seguridad de secretos.

---

Última actualización: Noviembre 2025

