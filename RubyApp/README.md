# Ruby App DentList
Esta es una plicacion que consume la API de DentList, dado que heroku limita el numero de aplicaciones, 
no pudimos hacer deply de esta aplicación, de todas formas, este readme contiene las instrucciones para correr esta aplicacion de forma local 
e interactuar con la API DentList alojada en https://dent-list.herokuapp.com.

Esta aplicacion permite interactuar a travez de una interfaz mas amigable con las rutas contenidas en la API de DentList.

## Instrucciones para ejecutar:

Se necesita tener instalado `<Ruby v-2.6.5>` y `<Rails v-6.0.3>`.

Una vez instalados Ruby y rails, desde la terminal, ubicarse en la carpeta `<DentlistApp>` dentro de la carpeta `<RubyApp>` 
y correr el comando `<bundle install>` para instalar todas las gemas que requiere la aplicación.

Finalmente, para correr la aplicacion en local, se debe correr el comando `<rails server>`, y podras ver la aplicacion funcionando en http://localhost:3001 .

OJO: La aplicacion corre en http://localhost:3001 y no en http://localhost:3000.