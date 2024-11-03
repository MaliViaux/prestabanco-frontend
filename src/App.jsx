import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from '../src/contexts/UserContext';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
import LoginEjecutivo from './components/LoginEjecutivo';
import Simulacion from './components/Simulacion';
import Formulario from './components/Formulario';
import Solicitud from './components/Solicitud';
import Archivos from './components/Archivos';
import ListaSolicitudes from './components/ListaSolicitudes';Evaluacion
import ListaEjecutivo from './components/ListaEjecutivo';
import Evaluacion from './components/Evaluacion';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/loginejecutivo" element={<LoginEjecutivo />} />
            <Route path="/cliente/simulacion" element={<Simulacion />} />
            <Route path="/cliente/formulario" element={<Formulario />} />
            <Route path="/cliente/solicitud" element={<Solicitud />} />
            <Route path="/cliente/archivos" element={<Archivos />} />
            <Route path="/cliente/solicitudes" element={<ListaSolicitudes />} />
            <Route path="/ejecutivo/solicitudes" element={<ListaEjecutivo />} />
            <Route path="/ejecutivo/evaluacion" element={<Evaluacion />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;