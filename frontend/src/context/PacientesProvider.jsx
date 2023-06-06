import { useState, useEffect, createContext } from "react";
import  axios  from "axios";
import usePacientes from "../hooks/usePacientes";

const PacientesContext = createContext();



export const PacientesProvider = ({children}) => {
    
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({})

    useEffect(() => {

      const obtenerPacientes = async () => {

        try {

          const token = localStorage.getItem("token");
          if(!token) return;

          const config = {
            headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }


        const {data} = await axios.get('http://localhost:3000/pacientes', config);

        setPacientes(data);


          
        } catch (error) {
          console.log(error)
          
        }

      }

      obtenerPacientes();
    
    }, [])
    




    const guardarPaciente = async (paciente) => {

      if(paciente.id){
        console.log("editando...")

        }else{
          
          try {

            const token = localStorage.getItem('token')
    
            const config = {
                headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            }
    
            const { data } = await axios.post('http://localhost:3000/pacientes', paciente, config )
    
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado} = data;
    
            setPacientes([pacienteAlmacenado, ...pacientes])
            
          } catch (error) {
            console.log(error.response.data.msg)
            
          }
            
        }
      }
      
      



    const editarPaciente = (paciente) => {
      setPaciente(paciente)

    }
    




  return (
    
    <PacientesContext.Provider value={{ pacientes, guardarPaciente,editarPaciente,paciente }} > {children} </PacientesContext.Provider>

  )

}


export default PacientesContext;