import React, {useState} from "react";

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

interface PropsAsignacion {
    doctores: Doctor[];
    pacientes: Paciente[];
    asignaciones: Asignacion[];
    setAsignaciones: React.Dispatch<React.SetStateAction<Asignacion[]>>;
    
};

const Asignacion: React.FC<PropsAsignacion> = ({
    asignaciones,
    doctores,
    pacientes,
    setAsignaciones  
}) => {
    const [idDoctor, setIdDoctor] = useState<number>(0);
    const [idPaciente, setIdPaciente] = useState<number>(0);
    const [fecha, setFecha] = useState<string>('');
    const [asignacionEditando, setAsignacionEditando] = useState<number | null>(null);

    const manejarAgregarOEditar = () => {
        if (idDoctor && idPaciente && fecha) {
            if (asignacionEditando !== null) {
                setAsignaciones(
                    asignaciones.map((asignacion) =>
                        asignacion.id === asignacionEditando ? { ...asignacion, idDoctor, idPaciente, fecha } : asignacion
                    )
                );
                setAsignacionEditando(null);
            } else {
                const nuevaAsignacion: Asignacion = {
                    id: asignaciones.length + 1,
                    idDoctor,
                    idPaciente,
                    fecha,
                };
                setAsignaciones([...asignaciones, nuevaAsignacion]);
            }
            setIdDoctor(0);
            setIdPaciente(0);
            setFecha('');
        } else {
            alert('Todos los campos son requeridos');
        }
    };

    const eliminarAsignacion = (id: number) => {
        const asignacionesFiltradas = asignaciones.filter((asignacion) => asignacion.id !== id);
        setAsignaciones(asignacionesFiltradas);
    };

    const actualizarAsignacion = (id: number) => {
        const asignacion = asignaciones.find((asignacion) => asignacion.id === id);
        if (asignacion) {
            setIdDoctor(asignacion.idDoctor);
            setIdPaciente(asignacion.idPaciente);
            setFecha(asignacion.fecha);
            setAsignacionEditando(id);
        }
    };

  return (
    <div className="contenedor-asignacion">
        <div className="titulo">
                <h1>Asignación</h1>
        </div>
        <div className="formasig">
            <form>
                <label htmlFor="doctor">Doctor</label>
                <select
                    value={idDoctor}
                    onChange={(e) => setIdDoctor(Number(e.target.value))}
                >
                    <option value={0}>Seleccionar Doctor</option>
                    {doctores.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.nombre} {doctor.apellido}
                        </option>
                    ))}
                </select>
                <label htmlFor="paciente">Paciente</label>
                <select
                    value={idPaciente}
                    onChange={(e) => setIdPaciente(Number(e.target.value))}
                >
                    <option value={0}>Seleccionar Paciente</option>
                    {pacientes.map((paciente) => (
                        <option key={paciente.id} value={paciente.id}>
                            {paciente.nombre} {paciente.apellido}
                        </option>
                    ))}
                </select>
                <label htmlFor="fecha">Fecha</label>
                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />
                <button type="button" onClick={manejarAgregarOEditar}>
                    {asignacionEditando ? 'Editar' : 'Agregar'}
                </button>
            </form>
            <h2>Lista de Asignaciones</h2>
            <table className="tabla-asignacion">
                <thead>
                    <tr>
                        <th>Doctor</th>
                        <th>Paciente</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {asignaciones.map((asignacion) => (
                        <tr key={asignacion.id}>
                            <td>{doctores.find((doctor) => doctor.id === asignacion.idDoctor)?.nombre}</td>
                            <td>{pacientes.find((paciente) => paciente.id === asignacion.idPaciente)?.nombre}</td>
                            <td>{asignacion.fecha}</td>
                            <td>
                                <button className="beliminar" onClick={() => eliminarAsignacion(asignacion.id)}>Eliminar</button>
                                <button className="bactualizar" type="button" onClick={() => actualizarAsignacion(asignacion.id)}>Actualizar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Asignacion;