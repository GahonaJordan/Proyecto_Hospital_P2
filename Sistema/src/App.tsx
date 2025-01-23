import { useState, useEffect } from 'react'
import './componentes/menu.css'
import './componentes/Inicio.css'
import './componentes/footer.css'
import './componentes/paciente.css'
import './componentes/doctor.css'
import './componentes/asignacion.css'
import './componentes/estudiante.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Menu from './componentes/menu';
import Inicio from './componentes/Inicio';
import Doctor from './componentes/Doctor'; // Add this line to import the Doctor component
import Paciente from './componentes/Paciente'; // Add this line to import the Paciente component
import Footer from './componentes/footer'
import Asignaciones from './componentes/Asignacion'
import Estudiante from './componentes/Estudiante'

interface Doctor {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  cedula: string;
  telefono: string;
  correo: string;
  horario: string;
};

interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  cedula: string;
  telefono: string;
  correo: string;
  fecha_nacimiento: string;
  direccion: string;
  historia_clinica: string;
};

interface Asignacion {
  id: number;
  idDoctor: number;
  idPaciente: number;
  fecha: string;
};

const App: React.FC = () => {
  const [doctores, setDoctores] = useState<Doctor[]>([
    { id: 1, nombre: 'Juan', apellido: 'Perez', especialidad: 'Cardiologia', cedula: '123456', telefono: '0987654321', correo: 'jperez@hotmail.com', horario: 'Lunes a Viernes de 8:00 a 12:00' },
  ]);
  const [pacientes, setPacientes] = useState<Paciente[]>([
    { id: 1, nombre: 'Maria', apellido: 'Gonzalez', edad: 25, cedula: '123456', telefono: '0987654321', correo: 'mgonzales@hotmail.com', fecha_nacimiento: '01/01/1996', direccion: 'Av. 10 de Agosto', historia_clinica: 'Ninguna' },
  ]);
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([
    { id: 1, idDoctor: 1, idPaciente: 1, fecha: '01/01/2021' },
  ]);

  //leer los datos del local storage al cargar la aplicacion
  useEffect(() => {
    const storageDoctores = localStorage.getItem('doctores');
    const storagePacientes = localStorage.getItem('pacientes');
    const storageAsignaciones = localStorage.getItem('asignaciones');


    if (storageDoctores) {
      setDoctores(JSON.parse(storageDoctores));
    }
    if (storagePacientes) {
      setPacientes(JSON.parse(storagePacientes));
    }
    if (storageAsignaciones) {
      setAsignaciones(JSON.parse(storageAsignaciones));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('doctores', JSON.stringify(doctores));
  }, [doctores]);

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  useEffect(() => {
    localStorage.setItem('asignaciones', JSON.stringify(asignaciones));
  }, [asignaciones]);

  return (
    <Router>
      <Menu />
      <div>
      <Routes>
        <Route 
          path="/"
          element={<Inicio />}
        />
        <Route
          path="/Doctor"
          element={
            <Doctor 
              doctores={doctores}
              setDoctores={setDoctores} 
              asignaciones={asignaciones}            
          />} 
        />
        <Route
          path="/Paciente"
          element={
            <Paciente 
              pacientes={pacientes}
              setPacientes={setPacientes} 
              asignaciones={asignaciones}            
          />}
        />
        <Route
          path="/MedicoAsignado"
          element={
          <Asignaciones
          asignaciones={asignaciones}
          setAsignaciones={setAsignaciones}
          doctores={doctores}
          pacientes={pacientes}
          />}
        />
        <Route 
          path="/Estudiante"
          element={<Estudiante />}
        />
      </Routes>
      </div>
      <Footer />
    </Router>

  );
};

export default App;
