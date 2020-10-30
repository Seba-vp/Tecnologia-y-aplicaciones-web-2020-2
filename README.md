# DENTLIST - MANATI - ENTREGA 4 

## Link App en Heroku https://dent-list.herokuapp.com/

## Consideraciones generales :bangbang:
**Antes de comenzar a correr el programa** ...

### Cosas no implementadas: :x::cry::x:

Todo implementado.
 
### Cosas implementadas: :white_check_mark: :stuck_out_tongue_closed_eyes: :white_check_mark:

 - **FUNCIONALIDADES MINIMAS:**

    Sacamos los tag html de todas las vistas

    Avanzamos en las siguientes funcionalidades:

    * Calificar una atención (dar feedback)
    * Acceder a dolores postulados
    * Cancelar una postulación a un dolor
    * Avanzar en chat

    Incorporamos imagenes para pacientes, dentistas, posts y organizaciones en storage en cloudinary y tenemos imagenes por default.

    Agregamos guards a rutas (middlewares) para restringir acceso a vistas en base a role y permisos. Además de las acciones sean visibles para los usuarios correspondientes. (Te devuelve a la página de inicio en caso de NO TENER ACCESO)
 
 - **BONUS:**

    Se envía un mail a paciente y dentista cuando se hace match por un dolor.

    Mejoramos estilo de la aplicación.

    Usamos el tipo de input correspondiente para cada tipo de dato.

### Ejecución del código:  :floppy_disk::floppy_disk::floppy_disk:

Para ver la app DentList, ingresar a https://dent-list.herokuapp.com/ , o descargar la carpeta savetalk de este repositorio y correr la app localmente.

### Librerías: :books: 

**Librerías:**

- Cloudinary 

### Usuarios y contraseñas 

Te recomendamos crear tus propios pacientes y odontologos para que confirmes el correcto envío de mail, funciona correctamente con un '@gmail' (llega al Spam) ya que con '@uc' se demora mucho y '@hotmail' detecta el spam y no lo muestra. Sin embargo te dejamos algunos ya registrados.

 - **Pacientes**
    * rodobkn98@gmail.com 
    * 123456
    - 2 dolores creados
    - 1 cita confirmada
    - 1 cita realizada

 - **Dentistas**
    * josefa@gmail.com
    * 123456
    - 1 cita realizada
    - Tiene un feedback de un paciente

### Consideraciones específicas y/o supuestos: :grin: :flushed: 

Todo sigue la normativa

## Referencias de código externo :

Para la implementacion del CSS, no se hizo copy paste de nada, pero si se uso w3School ´https://www.w3schools.com/css/´ para buscar informacion y metodos especificos.