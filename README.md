# DENTLIST - MANATI - ENTREGA 6(Final) 

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

### Documentacion API(recuerden cambiar los "localhost:3000"):

- **Login Paciente:**

  tipo = POST
  <br />
  path = localhost:3000/api/auth/loginPatient
  <br />
  RUTA ABIERTA

  Esta es una ruta ABIERTA, y la finalidad de ésta es poder hacer login con un Paciente respectivo. Se debe proveer el siguiente Header:
  <br />
  key = Content-Type
  <br />
  value = application/json

  Asimismo se debe proveer un body con el email y password del paciente con el que te quieras logear. Estos datos deben ser insertados de la siguiente forma:

  ```
    {
      "email": "emailx@gmail.com",
      "password": "123456"
    }
	``` 

  Luego de eso, si se ingresaron de forma correcta, la respuesta debiese ser de la siguiente forma:

   ```
    {
      "patientToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxcCIsIdsadsaTYwNjYwNjkzN30.wPGGTvdsadsacEBi5qiNPPPjKZF7MGCD6WxtRVEI"
    }
	``` 

  Recuerda seguir las intrucciones a detalle, sino recibirás un error.

- **Login Dentista:**

  tipo = POST
  <br />
  path = localhost:3000/api/auth/loginDentist
  <br />
  RUTA ABIERTA

  Esta es una ruta ABIERTA, y la finalidad de ésta es poder hacer login con un Dentista respectivo. Se debe proveer el siguiente Header:
  <br />
  key = Content-Type
  <br />
  value = application/json

  Asimismo se debe proveer un body con el email y password del Dentista con el que te quieras logear. Estos datos deben ser insertados de la siguiente forma:

  ```
    {
      "email": "emailx@gmail.com",
      "password": "123456"
    }
	``` 

  Luego de eso, si se ingresaron de forma correcta, la respuesta debiese ser de la siguiente forma:

   ```
    {
      "dentistToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxcCIsIdsadsaTYwNjYwNjkzN30.wPGGTvdsadsacEBi5qiNPPPjKZF7MGCD6WxtRVEI"
    }
	``` 

  Recuerda seguir las intrucciones a detalle, sino recibirás un error.

- **Obtener Data de un Paciente:**

  tipo = GET
  <br />
  path = localhost:3000/api/patient/data
  <br />
  RUTA RESTRINGIDA

  Esta es una ruta RESTRINGIDA, y la finalidad de ésta es poder obtener la data del Paciente con el que estas logeado. Para esto se debe proveer la Bearer Token entregada en el Login del Paciente.

  No necesita Headers adicionales ni Body.

  Si todo se realiza de manera correcta, la respuesta debiese ser de la siguiente forma:

   ```
    {
      "id": 1,
      "age": 30,
      "name": "Rodolfo Mendoza",
      "phone": "12345678",
      "address": "la nueva avenida",
      "city": "Santiago",
      "email": "email@gmail.com",
      "rut": "19956567-8",
      "isapre": "Cruz Blanca"
    }
	``` 

  Recuerda seguir las intrucciones a detalle, sino recibirás un error correspondiente.

- **Obtener Data de un Dentista:**

  tipo = GET
  <br />
  path = localhost:3000/api/dentist/data
  <br />
  RUTA RESTRINGIDA

  Esta es una ruta RESTRINGIDA, y la finalidad de ésta es poder obtener la data del Dentista con el que estas logeado. Para esto se debe proveer la Bearer Token entregada en el Login del Dentista.

  No necesita Headers adicionales ni Body.

  Si todo se realiza de manera correcta, la respuesta debiese ser de la siguiente forma:

   ```
    {
      "id": 1,
      "voluntario": "Si",
      "speciality": "ortodoncia",
      "rut": "19956143-k",
      "university": "La Chile",
      "universityYear": 4,
      "email": "josefa@gmail.com",
      "name": "Josefita Saes",
      "phone": "12345678",
      "address": "Paso del Roble",
      "city": "La Florida"
    }
	``` 

  Recuerda seguir las intrucciones a detalle, sino recibirás un error correspondiente.


- **Obtener las Citas de un Dentista:**

  tipo = GET
  <br />
  path = localhost:3000/api/dentist/seeDates
  <br />
  RUTA RESTRINGIDA

  Esta es una ruta RESTRINGIDA, y la finalidad de ésta es poder obtener las CITAS del Dentista con el que estas logeado. Para esto se debe proveer la Bearer Token entregada en el Login del Dentista.

  No necesita Headers adicionales ni Body.

  Si todo se realiza de manera correcta, la respuesta debiese ser de la siguiente forma:

   ```
    [
      {
        "dateId": 2,
        "status": "Cita Cancelada por Dentista",
        "nombrePaciente": "Rodolfo Mendoza",
        "nombreDolor": "Me duele la encia",
        "descripcionDolor": "dolor de encia"
      },
      {
        "dateId": 1,
        "status": "Cita ya fue llevada a cabo",
        "nombrePaciente": "Rodolfo Mendoza",
        "nombreDolor": "Me duele la lengua",
        "descripcionDolor": "Me queme la Lengua",
        "fecha": "2021-02-01"
      },
      {
        "dateId": 6,
        "status": "Cita en espera de la respuesta del paciente",
        "nombrePaciente": "fabricio",
        "nombreDolor": "dolor muela",
        "descripcionDolor": "muelas",
        "fecha": "2021-02-01"
      },
      {
        "dateId": 11,
        "status": "Cita confirmada por Paciente",
        "nombrePaciente": "Rodolfo Mendoza",
        "nombreDolor": "Dolor Labio",
        "descripcionDolor": "Me duele el Labio",
        "fecha": "2021-02-01"
      }
    ]
	``` 

  Recuerda seguir las intrucciones a detalle, sino recibirás un error correspondiente.

  Es importante destacar que debes prestar atención a la citas con los siguientes posibles "status":

  "status": "Cita confirmada por Paciente"
  <br />
  "status": "Cita en espera de la respuesta del paciente"

  Puesto que SOLAMENTE LAS CITAS QUE TENGAN ESTOS STATUS podrán ser modificadas(PATCH) en la ruta que corresponde a "Update Cita por un Dentista"

- **Update Cita por un Dentista:**

  tipo = PATCH
  <br />
  path = localhost:3000/api/dentist/updateDateApi
  <br />
  RUTA RESTRINGIDA

  Esta es una ruta Restringida, y la finalidad de ésta es poder hacer un Update de una cita a la que ya postuló el Dentista.
  Es importante mencionar que esta ruta va de la mano con la ruta anterior(Obtener las Citas de un Dentista) puesto que solamente se podrá hacer Update de las citas que tengan los siguientes "status":

  "status": "Cita confirmada por Paciente"
  <br />
  "status": "Cita en espera de la respuesta del paciente"

  Es importante tener esto en mente, puesto que los demás "status" no pueden ser modificados por el Dentista Logeado en cuestión.

  Como es una ruta Restringida, se debe proveer la Bearer Token del Dentista con el que estés Logeado.

  Asimismo se debe proveer el siguiente Header:
  <br />
  key = Content-Type
  <br />
  value = application/json

  También se debe proveer un body con el id de la cita, el cual debe ser un id de cita que le pertenezca al Dentista Logeado, sino te tirará error ya que el id de esa cita le pertenecerá a otro Dentista.
  Asimismo se debe proveer en el body dos posibles "state":

  "state": "citaRealizada"
  <br />
  "state": "rechazarCita"

  los cuales son basicamente tu decisión para hacer el UPDATE de la cita elegida. Es importante mencionar que si la cita tiene el siguiente "status":

  "status": "Cita en espera de la respuesta del paciente"

  no podrás elegir el "state": "citaRealizada" puesto que aún el paciente no acepta la cita que ofreciste. Sin embargo si podrás rechazar la cita, ya que puedes tener algún contratiempo y quizás ya no tienes esa fecha disponible para una posible cita.

  Por lo tanto, el body ingresado en esta ruta debiese tener la siguiente forma:

  ```
  {
    "dateId": 9,
    "state": "citaRealizada"
  }
	```

  Luego de eso, si se ingresaron de forma correcta, la respuesta debiese ser de la siguiente forma:

   ```
    {
      "message": "Realizó la cita exitosamente"
    }
	``` 

  Recuerda seguir las intrucciones a detalle, sino recibirás un error correspondiente.

- **Update Datos de un Paciente:**

  tipo = PATCH
  <br />
  path = localhost:3000/api/patient/data/update
  <br />
  RUTA RESTRINGIDA

  Esta es una ruta Restringida, y la finalidad de ésta es poder hacer un Update de los datos del Paciente con el que estás logeado.

  Como es una ruta Restringida, se debe proveer la Bearer Token del Paciente con el que estés Logeado.

  Asimismo se debe proveer el siguiente Header:
  <br />
  key = Content-Type
  <br />
  value = application/json

  El body a ingresar debe ser con TODOS los datos que se mostrarán en el body de ejemplo. Si te falta algún dato te tirará error por no seguir las instrucciones.

  Además, los datos ingresados en este body serán los futuros datos del Paciente, ya que los antiguos datos serán modificados por los que ingresarás en el Body.

  Por lo tanto, el body ingresado en esta ruta debiese tener la siguiente forma:

  ```
    {
      "name": "Rodolfo Mendoza",
      "age": "24",
      "phone": "12345678",
      "address": "callex",
      "city": "La Florida",
      "email": "emailx@gmail.com",
      "rut": "19956156-9",
      "isapre": "Fonasa",
      "password": "123456"
    }
	```

  Luego de eso, si se ingresaron de forma correcta, la respuesta debiese ser de la siguiente forma:

   ```
    {
      "name": "Rodolfo Mendoza",
      "age": "24",
      "phone": "12345678",
      "address": "callex",
      "city": "La Florida",
      "email": "emailx@gmail.com",
      "rut": "19956156-9",
      "isapre": "Fonasa",
      "password": "No te la reenviamos por tu seguridad, pero fue cambiada exitosamente!"
    }
	``` 

  Respuesta que muestra los datos actualizados del paciente.

  Recuerda seguir las intrucciones a detalle, sino recibirás un error correspondiente.


- **Update Datos de un Dentista:**

  tipo = PATCH
  <br />
  path = localhost:3000/api/dentist/data/update
  <br />
  RUTA RESTRINGIDA

  Esta es una ruta Restringida, y la finalidad de ésta es poder hacer un Update de los datos del Dentista con el que estás logeado.

  Como es una ruta Restringida, se debe proveer la Bearer Token del Dentista con el que estés Logeado.

  Asimismo se debe proveer el siguiente Header:
  <br />
  key = Content-Type
  <br />
  value = application/json

  El body a ingresar debe ser con TODOS los datos que se mostrarán en el body de ejemplo. Si te falta algún dato te tirará error por no seguir las instrucciones.

  Además, los datos ingresados en este body serán los futuros datos del Dentista, ya que los antiguos datos serán modificados por los que ingresarás en el Body.

  Por lo tanto, el body ingresado en esta ruta debiese tener la siguiente forma:

  ```
    {
      "name": "Josefa Saes",
      "year": "4",
      "phone": "12345678",
      "address": "callex",
      "city": "La Florida",
      "email": "josefa@gmail.com",
      "rut": "19956321-k",
      "voluntario": "Si",
      "speciality": "ortodoncia",
      "university": "Universidad de Chile",
      "password": "123456"
    }
	```

  Luego de eso, si se ingresaron de forma correcta, la respuesta debiese ser de la siguiente forma:

   ```
    {
      "name": "Josefa Saes",
      "year": "4",
      "phone": "12345678",
      "address": "callex",
      "city": "La Florida",
      "email": "josefa@gmail.com",
      "rut": "19956321-k",
      "voluntario": "Si",
      "speciality": "ortodoncia",
      "university": "Universidad de Chile",
      "password": "No te la reenviamos por tu seguridad, pero fue cambiada exitosamente!"
    }
	``` 

  Respuesta que muestra los datos actualizados del Dentista.

  Recuerda seguir las intrucciones a detalle, sino recibirás un error correspondiente.


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