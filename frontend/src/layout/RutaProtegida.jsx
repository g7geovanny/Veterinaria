import {Outlet, Navigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";
import Header from "../components/Header";



const RutaProtegida = () => {

  const {auth, cargando} = useAuth()

  if(cargando) return "CARGANDO..."

  return(
    
    <>

    <Header/>

      {auth?._id ? <Outlet/> : <Navigate to="/" /> }

    <Footer/>

     
      
   
      
    </>

  )
}

export default RutaProtegida