import {BrowserRouter, Routes, Route  } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";

import Confirmar from "./pages/Confirmar";
import Login from "./pages/Login";
import OlvidePassword from "./pages/OlvidePassword";
import Registrar from "./pages/Registrar";
import NuevoPassword from "./pages/NuevoPassword";
import AdministrarPacientes from "./pages/AdministrarPacientes";


import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";



const App = () => {
  return (

    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
        
            <Routes>

                <Route path="/" element={ <AuthLayout/> } >

                  <Route index element={<Login/>}/>
                  <Route path="registro" element={<Registrar/>}/>
                  <Route path="confirmar/:id" element={<Confirmar/>}/>
                  <Route path="olvidePassword" element={<OlvidePassword/>}/>
                  <Route path="olvidePassword/:token" element={<NuevoPassword/>}/>

                </Route>


                <Route path="/admin" element={<RutaProtegida />}>
                  <Route index element={<AdministrarPacientes/>}/>
                </Route>
              
            </Routes>

        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>

  
  )
}

export default App