# Prueba técnica reservamos

Alexis Dalai Waldo Jiménez\
4731444767\
alexiswaldo98@icloud.com

## Guía de funcionamiento

- En la carpeta resources se muestra un video evidencia del funcionamiento del sitio, en caso de que no se ejecute correctamente. 

//


1.- Al cargar la página el código hace una petición a https://search.reservamos.mx/api/v2/places, de tal forma que las ciudades disponibles estén precargadas en una lista antes de que el usuario comience la búsqueda.

2.- Al hacer click en el input text; el código muestra una lista con las ciudades disponibles en la API de reservamos, el usuario podrá dar click en cada una de ellas o bien comenzar a escribir para que se muestren sólo las coincidencias. Mientras no se seleccione una opción el botón de búsqueda permanece desactivado.

3.- Finalmente, tras seleccionar una ciudad; se muestra el clima de los próximos 5 días en la respectiva ciudad, la inormación es mostrada en grados Kelvin.

## Mejoras y observaciones

- Para desplegar el sitio localmente descargar el repositorio, ejecutar npm install para instalar las dependencias y posteriormente correr el localhost con npm start. Node v21.1.0. NPM 10.2.2.

- El código quedó desordenado, hay bloques que se pueden hacer más compactos y lo ideal es separar las funciones en submódulos más pequenos, de forma que sea mantenible y escalable por cualquier otro desarrollador.

- El Diseno UI es muy simple, lo ideal es agregar loaders de carga, timers, mostrar y ocultar elementos con transiciones y tener un diseno más amigable. No es responsive.


## Gracias :)