# atom-task-service
Se utilizo Express para poder exponer los servicios REST. Con la ayuda de firestore se puedo guardar la informacion que nos estan enviando desde el frontend de la aplicacion, utilizamos una base de datos NoSQL, eso quiere decir que tenemos la ventaja de poder crear objetos sin importar los campos que enviemos, el control de estos objetos los tenemos en la interfaz de donde controlamos estos aspectos.
## API
Los servicios que estan expuestos son:

### User
### Agregar Usuario
* Post /user
### Obtiene el usuario por correo
* Get /users/{email}

### Task
### Agregar tarea
* Post /tasks
### Obtiene el tarea por su ID
* Get /tasks/{id}
### Obtiene todas las tareas ordenadas por fecha de creación
* Get /tasks
### Elimina la tarea por su ID
* DELETE /tasks/{id}
### Actualiza los campos de las tareas por el ID
* PUT /tasks/{id}
