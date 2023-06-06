import mongoose from "mongoose";
import bcrypt from "bcrypt";// 


import generarId from "../helpers/generarId.js";


//MONGO ASIGNA UN ID AUTOMATICAMENTE A CADA REGISTRO QUE SE VA AGREGANDO


//CREACION DE LA ESTRUCTURA (SCHEMA)
const veterinarioSchema =  mongoose.Schema({

    nombre:{

        type: String,  //tipo de dato
        
        required: true, //obligatorio

        trym: true, //elimina los espacios en blanco
    },

    email:{

        type: String,  
        
        required: true, 

        trym: true,

        unique: true // que sea unico
    },



    password:{

        type: String,  
        
        required: true, 

        trym: true, 
    },


   
    telefono:{

        type: String,  
        default: null,
        trim: true

    },

    web:{
        type: String,
        default: null
    },


    token:{

        type: String,
        default: generarId(),

    },

    confirmado:{
        type: Boolean,
        default: false
    }


});

//hash de password antes de guardar
veterinarioSchema.pre("save", async function(next){

    //Verifica si el password ya tiene hash, para no volver a hashear
    if(!this.isModified('password')){

        next();// manda al siguiente middleware

    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});



//De esta forma agregamos metodos al Schema/Modelo
veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return bcrypt.compare(passwordFormulario, this.password)

};




//Veterinario es el nombre del modelo / veterinarioSchema es la esctructura que tendra el modelo         
const Veterinario = mongoose.model("Veterinario", veterinarioSchema );

export default Veterinario;