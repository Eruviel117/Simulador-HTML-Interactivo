# Simulador-HTML-Interactivo


# SISTEMAS OPERATIVOS - 

## Información del Estudiante
- **Nombre:** Euruviel Márquez Martínez  
- **Matrícula:**  SW2509018
- **Grupo:** 2C 
- **Carrera:** TSW  
- **Cuatrimestre:** segundo
- **Profesor:** Jorge Javier Pedrozo Romero  

# Actividad-Puntos Extras



# Simulador de Asignación de Memoria
## Comparación de Algoritmos Best Fit y Worst Fit

---

## a) Introducción

Este proyecto consiste en un simulador interactivo desarrollado en HTML, CSS y JavaScript que permite visualizar el funcionamiento de los algoritmos de asignación de memoria **Best Fit** y **Worst Fit**.

El objetivo principal es comprender cómo cada algoritmo selecciona bloques de memoria para asignar procesos, así como analizar su impacto en la fragmentación y el aprovechamiento de memoria.

El simulador permite observar en tiempo real cómo se divide la memoria, cómo se generan fragmentos libres y cómo cada algoritmo toma decisiones distintas ante los mismos procesos.

---

## b) Instrucciones

### ¿Qué debe hacer el usuario?

1. Ingresar el tamaño total de memoria.
2. Indicar el número de particiones iniciales.
3. Presionar **"Inicializar Memoria"**.
4. Agregar procesos indicando nombre y tamaño.
5. Ejecutar los procesos paso a paso o ejecutar todos automáticamente.
6. Observar los resultados en ambas columnas (Best Fit y Worst Fit).

---

### ¿Qué va a observar?

- Cómo cada algoritmo selecciona un bloque diferente.
- Cómo se dividen los bloques cuando el proceso no ocupa todo el espacio.
- Cómo se genera fragmentación externa.
- Diferencias en el porcentaje de memoria utilizada.
- Comparación directa en la tabla de métricas.

---

### ¿Qué significan los resultados?

- **Fragmentación:** Espacio libre que queda sin utilizar después de varias asignaciones.
- **Memoria Utilizada (%):** Porcentaje del total de memoria que fue asignada a procesos.
- **Procesos Asignados:** Cantidad total de procesos que lograron entrar en memoria.
- **Mejor algoritmo:** El que presenta menor fragmentación o mayor eficiencia de uso.

---

## c) Explicación de los algoritmos

### 🔵 Best Fit (Mejor Ajuste)

Este algoritmo busca el bloque libre más pequeño que sea suficiente para almacenar el proceso.

- Reduce el desperdicio inmediato.
- Puede generar muchos fragmentos pequeños.
- Tiende a producir fragmentación externa con el tiempo.

Funcionamiento:
1. Recorre todos los bloques libres.
2. Selecciona el que tenga la menor diferencia entre tamaño del bloque y tamaño del proceso.
3. Divide el bloque si sobra espacio.

---
