# DENTLIST - MANATI - ENTREGA 4 

## Link App en Heroku https://dent-list.herokuapp.com/

## Consideraciones generales :bangbang:
**Antes de comenzar a correr el programa** ...

### Cosas no implementadas: :x::cry::x:

Tenemos un bug :bug: en la parte de proteger las vistas para los usuarios. Especificamente tenemos el problema que se puede acceder a través de un dolor a dar feedback de un odontologo. Para solucionarlo y en vista de mejorar los path decidimos dejarlo para la próxima entrega, ya que queremos cambiar los path y necesitamos tiempo para testear toda la aplicación. Actualmente estamos en construcción de la solución. :construction: Lamentamos los inconvenientes.
 
### Cosas implementadas: :white_check_mark: :stuck_out_tongue_closed_eyes: :white_check_mark:

 - **FUNCIONALIDADES MINIMAS:**
   
   Realizamos todos los puntos establecidos en el feedback de la entrega pasada. En particular los siguientes:

   * Rutas protegidas

   * No se puede crear dolor, eliminar ni modificar la información a otros pacientes.

   * Ahora los botones de "update user" y "delete user" se cambiaron por "modificar perfil" y "borrar cuenta" para que sean más amigables

   * Ya no se puede crear una postulación con precio negativo

 - **ReactJS:**

   * Se implemento un buscador para filtrar dolores con ReactJS.

   * Se implemento la modificación del perfil del paciente con ReactJS.

   * Se implemento el feedback con estrellas.
 
 - **BONUS:**

   * Cuando se acepta una cita de un odontólogo como paciente, se muestra un sppiner (React)

   * Estilo al Mail.

### Ejecución del código:  :floppy_disk::floppy_disk::floppy_disk:

Para ver la app DentList, ingresar a https://dent-list.herokuapp.com/ , o descargar la carpeta savetalk de este repositorio y correr la app localmente.

### Librerías: :books: 

**Librerías:**

- Cloudinary 

### Usuarios y contraseñas 

Te recomendamos crear tus propios pacientes y odontologos para que confirmes el correcto envío de mail, funciona correctamente con un '@gmail' (llega al Spam) ya que con '@uc' se demora mucho y '@hotmail' detecta el spam y no lo muestra. Sin embargo te dejamos algunos ya registrados.

 - **Pacientes**
    * mail: rodobkn98@gmail.com 
    * password: 123456
    - 2 dolores creados
    - 1 cita confirmada
    - 1 cita realizada

 - **Dentistas**
    * mail: josefa@gmail.com
    * password: 123456
    - 1 cita realizada
    - Tiene un feedback de un paciente

### Consideraciones específicas y/o supuestos: :grin: :flushed: 

Todo sigue la normativa

## Referencias de código externo :

Para la implementacion del CSS, no se hizo copy paste de nada, pero si se uso w3School ´https://www.w3schools.com/css/´ para buscar informacion y metodos especificos.