import express from "express";
import dotenv from 'dotenv'// PERMITE LEER LOS ARCHIVOS .env
import cors from "cors";

import DB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacientesRoutes from "./routes/pacientesRoutes.js";


const app = express();


//ACTIVA LA LECTURA DEL REQUEST
app.use(express.urlencoded({ extended : true}))


//ACTIVA LA LECTURA DE DATOS TIPO JSON
app.use(express.json());

//Permite la entrada de datos de ciertas URLs
app.use(cors());


//ACTIVA LECTURA ARCHIVOS .ENV
dotenv.config()


//CONEXION A LA BASE DE DATOS
DB();


//RUTAS
app.use("/veterinarios", veterinarioRoutes )
app.use("/pacientes", pacientesRoutes )



//CREACION DEL SERVIDOR
const port = 3000;

app.listen( port, () => {console.log("******* ESCUCHANDO EN EL PUERTO 3000 **********")} )


