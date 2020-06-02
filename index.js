const express = require('express'); //Con esto se importa la libreria de express
const app = express();//Se llama al constructor de la clase Express

//Rutas 
const empleado = require('./Rutas/empleados.js');
const user = require('./Rutas/user.js');

//Middleware
const auth = require('./middleware/auth');
const index = require('./middleware/index');
const notFound = require('./middleware/notFound');
const cors = require('./middleware/cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);//Listo

app.use("/user", user);//Listo

app.use(auth);//Listo

app.use("/empleados", empleado);

app.use(notFound);//Debe ser la ultima


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
}); //Es una funcion con 2 parametros; 1:Puerto 2:Funcion que hace que el servidor escuche