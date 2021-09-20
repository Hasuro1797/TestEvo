## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` se crea un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres.

Adicionalmente será necesario que creen desde psql una base de datos llamada `publicaciones`

El contenido de `client` fue creado usando: Create React App.

Realizar: 
```
npm install 
```
Tanto en la carpeta de `api` y `client`
la carpeta `api` tiene como ruta local  "localHost:3001" y la carpeta `client` como ruta local "localHost:3000".
```
npm start 
```
tanto en la terminal de `api` como de `client` para ejecutar el codigo.

El ususario a ingresar en la ruta de Login es el siguiente:
```
email: "usuarioPrueba@gmail.com"
password: 123456
```
