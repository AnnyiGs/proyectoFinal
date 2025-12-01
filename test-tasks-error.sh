#!/bin/bash

# Script de prueba con error intencional
# Envía una tarea a tasks-service pero apunta a un notify-service incorrecto

echo "Enviando tarea de prueba con error..."

# Usamos un endpoint incorrecto para forzar el error
curl -X POST http://localhost:3001/tasks \
     -H "Content-Type: application/json" \
     -d '{"title": "Tarea con error"}'

echo
echo "Fin del script"


