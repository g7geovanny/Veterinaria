import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarWebToken.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePasword.js";





 /******* REGISTRO DE USUARIO **********/

const registrar = async (req,res) => {

    const {nombre, email} = req.body;
    
    const usuarioExistente = await Veterinario.findOne({email});

    //Revisa que el usuario ya exista
    if(usuarioExistente){

        const error = new Error('El usuario ya existe');
        return res.status(400).json({ msg: error.message })

    }


    try {
        //Crea a un nuevo usuario con los datos del request
        const veterinario = new Veterinario(req.body);
        veterinario.token = generarId();
        const veterinarioGuardado = await veterinario.save();

        //Envia el token para confirmar cuenta
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });

        return res.status(200).json({ msg: 'Usuario creado, Revisa tu email' })


    } catch (error) {

     res.json(error)
        
    }


};







/****** CONFIRMACION *********/

const confirmar = async (req, res) => {
   
    const{token} = req.params; 
    
    const usuarioConfirmar = await Veterinario.findOne({token})

    if (!usuarioConfirmar) {
        const error = new Error("Token no válido");
        return res.json({ msg: error.message });
      }

    try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();

    res.json({ msg: "Usuario Confirmado Correctamente" });
    
    } catch (error) {

    console.log(error)
    
    }


  };
  








/********* LOGIN (INICIO DE SESION)****************/

const autenticar = async (req,res) => {

    const {email, password} = req.body;

    //Comprueba si el email petenece a un usuario
    const usuario = await Veterinario.findOne({email});

    if(!usuario){

        const error = new Error('el usuario no existe');
        return res.status(403).json({msg: error.message});

    }


    //CONFIRMA QUE EL USUARIO ESTE CONFIRMADO
    if(!usuario.confirmado){

        const error = new Error('el usuario no esta confirmado');
        return res.status(403).json({msg: error.message});

    }


    //CONFIRMA QUE LAS CONTRASEÑAS SEAN LAS MISMAS
    if(await usuario.comprobarPassword(password)){

        //RETORNA AL USUARIO Y LE CREA UN NUEVO TOKEN PARA LA AUTENTICACION
        res.json( { 
            _id: usuario._id,
            nombre: usuario.nombre,
            email:usuario.email,
            token:  generarJWT(usuario.id)
          });

    }else{

        const error = new Error('El Password es Incorrecto');

        return res.status(403).json({msg: error.message});
        
    }
 
}






/************** PERFIL ************/

const perfil = (req,res) => {

    const {veterinario} = req;
    console.log(veterinario)

    res.json(veterinario)
}





/******** OLVIDE PASSWORD **************** */

const olvidePassword = async (req,res) => {

   const {email} = req.body;

   const existe = await Veterinario.findOne({email}) 

   if(!existe){

    const error = new Error('El usuario no existe');
    return res.status(400).json({msg: error.message})

   }

   try {
    existe.token = generarId();
    await existe.save();

    //Envia el email con las instrucciones
    emailOlvidePassword({
        
        email,
        nombre: existe.nombre,
        token: existe.token

    })

    res.json({msg: "Hemos enviado instrucciones para restablecer tu password"})
    
   } catch (error) {
    
   }

};


const comprobarToken = async (req,res) => {

    const {token} = req.params;

    const tokenValido = await Veterinario.findOne({token});

    if(tokenValido){

        res.json({ msg: "El token es valido"})

    }else{

        const error = new Error('El token no es valido');

        return res.status(404).json({msg: error.message})
    }


};


const nuevoPassword = async (req,res) => {

    const {token} = req.params;
    const {password} = req.body;

    const veterinario = await Veterinario.findOne({token});

    if(!veterinario){
        const error = new Error('Hubo un error');
        return res.status(404).json({msg: error.message});

    }

    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({msg: 'El password se actualizo correctamente'});
        
    } catch (error) {
        
    }

    
};


export{
    registrar,
    confirmar,
    autenticar,
    perfil,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
}