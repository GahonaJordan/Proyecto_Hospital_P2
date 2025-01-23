import React from 'react';
import { Link } from 'react-router-dom';
import menuImage from './imagen/Designer1.png';


const Menu: React.FC = () => {
    return (
        <>       
            <nav className="menu-container">
                <Link to="/" >
                    Inicio
                </Link>
                <Link to="/Doctor">
                    Doctor
                </Link>
                <Link to="/Paciente">
                    Paciente
                </Link>
                <Link to="/MedicoAsignado">
                    Medico Asignado
                </Link>
                <Link to="/Estudiante">
                    Estudiante
                </Link>
            </nav>
            
        </>
    );
};

export default Menu;