import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";


const Formulario = () => {

const [nombre, setNombre] = useState('')
const [propietario, setPropietario] = useState('')
const [email, setEmail] = useState('')
const [fecha, setFecha] = useState('')
const [sintomas, setSintomas] = useState('')
const [id, setId] = useState(null)


const [alerta, setAlerta] = useState({})

const { guardarPaciente, paciente } = usePacientes()


useEffect(() => {

    if(paciente?.nombre){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
        setId(paciente._id)
    }

}, [paciente])






const handleSumbit = e => {
    e.preventDefault()

    if([nombre, propietario, email, fecha, sintomas].includes('')){
        
        setAlerta({ msg: 'Todos los campos son necesario', error: true});

        return;

    }

    setAlerta({})

    guardarPaciente({nombre, propietario, email, fecha, sintomas, id}) 
    
}

const {msg} = alerta


  return (
    <>

    <p className='text-lg text-center mb-10'>Añade tus Paceintes y {''} <span className='text-indigo-600 font-bold '>Administralos</span></p>

    <form className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md' onSubmit={handleSumbit} >
        
        {msg && <Alerta alerta={alerta}/>}

        <div className='mb-5'>
            <label className='text-gray-700 uppercase font-bold' htmlFor="nombre">Nombre Mascota</label>
            <input value={nombre} onChange={ e => setNombre(e.target.value) } id="nombre" type="text" placeholder='Nombre de la Mascota' className='border-2 w-full p-2 placeholder-gray-400 rounded-md ' />
        </div>

        <div className='mb-5'>
            <label className='text-gray-700 uppercase font-bold' htmlFor="propietario">Nombre Propietario</label>
            <input value={propietario} onChange={ e => setPropietario(e.target.value) } id="propietario" type="text" placeholder='Nombre de la Mascota' className='border-2 w-full p-2 placeholder-gray-400 rounded-md ' />
        </div>

        <div className='mb-5'>
            <label className='text-gray-700 uppercase font-bold' htmlFor="email">Email Propietario</label>
            <input value={email} onChange={ e => setEmail(e.target.value) }  id="email" type="email" placeholder='email' className='border-2 w-full p-2 placeholder-gray-400 rounded-md' />
        </div>

        <div className='mb-5'>
            <label className='text-gray-700 uppercase font-bold' htmlFor="fecha">Fecha Alta</label>
            <input value={fecha} onChange={ e => setFecha(e.target.value) }  id="fecha" type="date"  className='border-2 w-full p-2 placeholder-gray-400 rounded-md ' />
        </div>

        <div className='mb-5'>
            <label className='text-gray-700 uppercase font-bold' htmlFor="fecha">Sintomas</label>
            <textarea value={sintomas} onChange={ e => setSintomas(e.target.value) }id="sintomas" placeholder='Describe los sintomas'  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md ' />
        </div>


        <input type="submit" className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors' value={id ? "Editar Paciente" : "Agregar Paciente" } />

    </form>
    
    </>
  )
}

export default Formulario