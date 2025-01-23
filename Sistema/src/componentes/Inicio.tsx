import React from "react";

const Inicio: React.FC = () => {

    return (
        <div className="container-presentacion">
                <div className="tarjeta-presentacion">
                    <div className="header">Bienvenido al sistema de gestión hospitalaria</div>
                    <div className="description">
                        Este sistema te permitirá gestionar los pacientes, médicos y asignaciones.
                    </div>
                </div>
            </div>
    );
};

export default Inicio;