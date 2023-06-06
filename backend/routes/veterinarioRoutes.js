
//DEPENDENCIAS
import express from "express";

//CONTROLADORES
import {registrar,confirmar,autenticar,perfil, olvidePassword, comprobarToken, nuevoPassword,} from "../controllers/veterinarioController.js";

//MIDDLEWERS
import checkAuth from "../middleware/authMiddleware.js";



const router = express.Router();


/****** AREA PUBLICA *****/

//PAGINA DE REGISTRO
router.post('/', registrar );

//PAGINA DE CONFIRMACION
router.get('/confirmar/:token', confirmar);

//PAGINA DE INICIO DE SESION
router.post('/login',autenticar);



//RESTABLECER CONTRASEÑA

router.post('/olvide-password', olvidePassword);

router.get('/olvide-password/:token', comprobarToken);

router.post('/olvide-password/:token', nuevoPassword);





/******** AREA PRIVADA ******/

//PAGINA DE PERFIL
router.get('/perfil', checkAuth, perfil);











export default router;