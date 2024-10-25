import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
import LoginEjecutivo from './components/LoginEjecutivo';
import Simulacion from './components/Simulacion';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          {/* Redirigir la raíz a /login */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loginejecutivo" element={<LoginEjecutivo />} />
          <Route path="/cliente/simulacion" element={<Simulacion />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;