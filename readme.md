# Ejercicio React - Módulo Frameworks - Lemoncode

## Resumen

Filtrado organización miembros Github:
En el ejercicio básico vamos a buscar el listado de miembros de Github de la organización que indique el usuario.

Enunciado
Añadir un input y un botón para filtrar por organización, es decir:

- Se muestra por defecto el listado de miembros de lemoncode.
- Se muestra un input que por defecto tiene como valor: lemoncode.
- El usuario puede teclear otro nombre de organizacíon, por ejemplo: microsoft y al pulsar el botón de busqueda te muestra los miembros de dicha organizacíon.
- Que al volver de la página de detalle se muestre la organización que se había tecleado en el filtro (por ejemplo si el usuario tecleó microsoft se debe de ver Microsoft).

## Paso a Paso

- Clona este repositorio y haz _npm install_

```bash
npm install
```
- Después solo tendrás que hacer _npm start_

```bash
npm start
```

- Si queremos ver qué tipo de datos vamos a manejar, podemos abrir el navegador web y ver que devuelve la API Rest de Github.

```bash
https://api.github.com/orgs/lemoncode/members
```