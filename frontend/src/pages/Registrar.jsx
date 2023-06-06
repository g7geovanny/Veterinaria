import { Link } from "react-router-dom";
import {useState} from "react";
import  axios  from "axios";


import Alerta from "../components/Alerta";


const Registrar = () => {

 

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword,setRepetirPassword ] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {

    e.preventDefault();

    //Revisa que ningun campo este vacio
    if([nombre, email, password, repetirPassword].includes('')){
     setAlerta({error: true, msg:'Al menos un campo esta vacio'})
      return;
    };

    //Los passwords deben ser iguales
    if(password !== repetirPassword){

      setAlerta({error:true, msg:'Los passwords no son iguales'});

      return;

    }

    //El password debe ser mayor a 6 caracteres
    if(password.length < 6){

      setAlerta({error: true, msg:'El password debe ser mayor a 6 caracteres'});

      return;

    };


    setAlerta({});

      //Crea al usuario en la API
      await axios.post("http://localhost:3000/veterinarios", {
      nombre: nombre,
      email: email,
      password: password
    })

    .then(function (response) {
      setAlerta({msg: response.data.msg, error: false })
    })

    .catch(function (error) {
      setAlerta({msg: error.response.data.msg, error: true })
    });

}

  const {msg} = alerta;

  

  return (

    <>

        <div>

          <h1 className=' text-indigo-700 font-black text-6xl'>
            Crea Tu Cuenta Y Administra Tus
            <span className=' text-black'> Pacientes</span>
          </h1>

        </div>

        <div className="mt-20  md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

          {msg && <Alerta alerta={alerta} />}

            <form onSubmit={handleSubmit}>

              <div className=' my-5'>

                <label className=' uppercase text-gray-600 block text-xl font-bold' htmlFor="">
                  Nombre
                </label>

                <input
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                type="text" 
                placeholder='Tu nombre' 
                value={nombre}
                onChange={ e => {setNombre(e.target.value)}}
                />

              </div>


              <div className=' my-5'>

                <label className=' uppercase text-gray-600 block text-xl font-bold' htmlFor="">
                  Email
                </label>

                <input 
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
                type="email" 
                placeholder='Email De Registro'
                value={email}
                onChange={ e => {setEmail(e.target.value)}}
                />

              </div>


              <div className=' my-5'>

                <label className=' uppercase text-gray-600 block text-xl font-bold' htmlFor="">
                  Password
                </label>

                <input 
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
                type="password" 
                placeholder='Tu contraseña'
                value={password}
                onChange={ e => {setPassword(e.target.value)}} 
                />

              </div>


              <div className=' my-5'>

                <label className=' uppercase text-gray-600 block text-xl font-bold' htmlFor="">
                  Repite Tu Password
                </label>

                <input 
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
                type="password" 
                placeholder='Repite tu password'
                value={repetirPassword} 
                onChange={e => {setRepetirPassword(e.target.value)}}
                />

              </div>


              <input
              type="submit"
              value="Registrarse"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              
              />

            </form>


            <nav className="mt-10 lg:flex lg:justify-between">

              <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes cuenta? Inicia Sesion</Link>

              <Link className="block text-center my-5 text-gray-500" to="/olvidePassword">Olvide mi Password</Link>

            </nav>

        </div>
   
    </>
  )
}

export default Registrar