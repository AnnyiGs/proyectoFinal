#!/bin/bash

# Número de tareas a crear
NUM_TASKS=5

for i in $(seq 1 $NUM_TASKS)
do
  TITLE="Tarea de prueba $i"
  RESPONSE=$(curl -s -X POST http://localhost:3001/tasks \
       -H "Content-Type: application/json" \
       -d "{\"title\": \"$TITLE\"}")
  
  echo "Creada: $RESPONSE"
done


