import Paciente from "../models/Pacientes.js";




/***********  AGREGA PACIENTES  ************/

const agregarPacientes = async (req, res) => {

    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;

    try {
        const pacienteGuardado = await paciente.save();
        res.json(pacienteGuardado);
        
    } catch (error) {
        console.log(error)
    }   
}





const obtenerPacientes = async (req, res) => {

    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);

    res.json(pacientes)

};




//OBTENER PACIENTE

const obtenerPaciente = async (req, res) => {
    
   const {id} = req.params.id;

   const paciente = await Paciente.findOne(id);

   if(!paciente){
        
    res.status(404).json({msg: 'paciente no encontrado'})

   }

   if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
    returnres.json({ msg: "Accion no valida"})

   }

    return res.json(paciente)

}




 //ACTULIZAR PACIENTE

const actualizarPaciente = async (req, res) => {

    const {id} = req.params.id;

    const paciente = await Paciente.findById(id);

    if(!paciente){

        return res.status(404).json({msg: 'Paciente no encontrado'})
    
       }
 
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
     return res.json({ msg: "Accion no valida"})
 
    }  

    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {

        const pacienteActualizado = await paciente.save();
        return res.json(pacienteActualizado);
        
    } catch (error) {
        console.log(error);
        
    }

};


const eliminarPaciente = (req, res) => {

}




export{
    agregarPacientes,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}