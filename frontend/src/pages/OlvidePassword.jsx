import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import axios from "axios";
import { useState } from "react";

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email === ''){

      setAlerta({msg: 'El email es obligatorio', error: true});
      return;

    }

    try {
      const {data} = await axios.post('http://localhost:3000/veterinarios/olvide-password', {email});
      console.log(data)

      setAlerta({msg: data.msg})
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      
    }

  }

  const {msg} = alerta;

  return (

    <>

    <div>

      <h1 className=' text-indigo-700 font-black text-6xl'>
        Restablece tu
        <span className=' text-black'> Contraseña</span>
      </h1>

    </div>
    

    <div className="mt-20  md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

    {msg && <Alerta alerta={alerta} />}

    <form action="" onSubmit={handleSubmit}>

      <div className=' my-5'>

        <label className=' uppercase text-gray-600 block text-xl font-bold' htmlFor="">
          Email
        </label>

        <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="email" placeholder='Email De Registro' 
        onChange={ e => setEmail(e.target.value) }
        value={email}
        />

      </div>


      <input
       type="submit"
       value="Restablecer Contraseña"
       className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
        />
      
    </form>

    <nav className="mt-10 lg:flex lg:justify-between">

      <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes Cuenta? Inicia Sesion?</Link>

      <Link className="block text-center my-5 text-gray-500" to="/registro">¿No tienes Cuenta? Registrate</Link>

    </nav>

    

    </div>
   
   </>
  )
}

export default OlvidePassword