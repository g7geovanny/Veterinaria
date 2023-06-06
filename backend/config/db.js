import mongoose from "mongoose";

//CONFIGURACION CONEXION BASE DE DATOS

const DB = async () => {

    try {

        const conexion = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        const url = ` HOST: ${conexion.connection.host}: PUERTO: ${conexion.connection.port}`;


        console.log(`MONGO-DB ESTA CONECTADO EN ${url}`)


        
    } catch (error) {

        console.log(`ERROR: ${error.message}`);
        process.exit(1)
        
    }

}


export default DB;