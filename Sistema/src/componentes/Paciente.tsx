import React, {useState} from "react";

interface Asignacion {
    id: number;
    idDoctor: number;
    idPaciente: number;
    fecha: string;
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

interface PropsPaciente {
    pacientes: Paciente[];
    setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
    asignaciones: Asignacion[];
};

const RegistrarPaciente: React.FC<PropsPaciente> = ({
    pacientes,
    setPacientes,
    asignaciones
}) => {
    const [nombre, setNombre] = useState<string>('');
    const [apellido, setApellido] = useState<string>('');
    const [edad, setEdad] = useState<number>(0);
    const [cedula, setCedula] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [correo, setCorreo] = useState<string>('');
    const [fecha_nacimiento, setFecha_nacimiento] = useState<string>('');
    const [direccion, setDireccion] = useState<string>('');
    const [historia_clinica, setHistoria_clinica] = useState<string>('');
    const [pacienteEditando, setPacienteEditando] = useState<number | null>(null);

    const manejarAgregarOEditar = () => {
        if (nombre.trim() && apellido.trim() && cedula.trim() && telefono.trim() && correo.trim() && fecha_nacimiento.trim() && direccion.trim() && historia_clinica.trim()) {
            if (pacienteEditando !== null) {
                setPacientes(
                    pacientes.map((paciente) =>
                        paciente.id === pacienteEditando ? { ...paciente, nombre, apellido, edad, cedula, telefono, correo, fecha_nacimiento, direccion, historia_clinica } : paciente
                    )
                );
                setPacienteEditando(null);
            } else {
                const nuevoPaciente: Paciente = {
                    id: pacientes.length + 1,
                    nombre,
                    apellido,
                    edad,
                    cedula,
                    telefono,
                    correo,
                    fecha_nacimiento,
                    direccion,
                    historia_clinica
                };
                setPacientes([...pacientes, nuevoPaciente]);
            }
            setNombre('');
            setApellido('');
            setEdad(0);
            setCedula('');
            setTelefono('');
            setCorreo('');
            setFecha_nacimiento('');
            setDireccion('');
            setHistoria_clinica('');
        } else {
            alert('Todos los campos son requeridos');
        }
    };

    const eliminarPaciente = (id: number) => {
        const pacienteAsignado = asignaciones.some((asignacion) => asignacion.idPaciente === id);
        if (pacienteAsignado) {
            alert('No se puede eliminar el paciente porque tiene asignaciones');
            return;
        }
        const pacientesFiltrados = pacientes.filter((paciente) => paciente.id !== id);
        setPacientes(pacientesFiltrados);
    };

    const actualizarPaciente = (id: number) => {
        const paciente = pacientes.find((paciente) => paciente.id === id);
        if (paciente) {
            setNombre(paciente.nombre);
            setApellido(paciente.apellido);
            setEdad(paciente.edad);
            setCedula(paciente.cedula);
            setTelefono(paciente.telefono);
            setCorreo(paciente.correo);
            setFecha_nacimiento(paciente.fecha_nacimiento);
            setDireccion(paciente.direccion);
            setHistoria_clinica(paciente.historia_clinica);
            setPacienteEditando(id);
        }
    };

    return (
        <div className="contenedor-paciente">
            <div className="titulo">
            <h1>Paciente</h1>
            </div>
            <div className="fromPac">
            <form onSubmit={(e) => { e.preventDefault(); manejarAgregarOEditar(); }}>
            <label>Nombre:</label>
            <input 
                type="text" 
                value={nombre} 
                placeholder="Ingrese el nombre"
                onChange={(e) => setNombre(e.target.value.replace(/[^a-zA-Z\s]/g, ''))} 
                required />
            <label>Apellido:</label>
            <input 
                type="text" 
                value={apellido} 
                placeholder="Ingrese el apellido"
                onChange={(e) => setApellido(e.target.value.replace(/[^a-zA-Z\s]/g, ''))} 
                required />
            <label>Edad:</label>
            <input 
                type="number" 
                value={edad} 
                placeholder="Ingrese la edad"
                onChange={(e) => setEdad(Number(e.target.value.replace(/[^0-9]/g, '')))} 
                required />
            <label>Cedula:</label>
            <input 
                type="text" 
                value={cedula} 
                placeholder="Ingrese la cédula"
                onChange={(e) => setCedula(e.target.value.replace(/[^0-9]/g, ''))} 
                required />
            <label>Telefono:</label>
            <input 
                type="text" 
                value={telefono} 
                placeholder="Ingrese el teléfono"
                onChange={(e) => setTelefono(e.target.value.replace(/[^0-9]/g, ''))} 
                required />
            <label>Correo:</label>
            <input 
                type="email" 
                value={correo} 
                placeholder="Ingrese el correo"
                onChange={(e) => setCorreo(e.target.value.replace(/[^a-zA-Z0-9@._-]/g, ''))} 
                required />
            <label>Fecha de Nacimiento:</label>
            <input 
                type="date" 
                value={fecha_nacimiento} 
                onChange={(e) => setFecha_nacimiento(e.target.value)} 
                required />
            <label>Direccion:</label>
            <input 
                type="text" 
                value={direccion} 
                placeholder="Ingrese la dirección"
                onChange={(e) => setDireccion(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))} 
                required />
            <label>Historia Clinica:</label>
            <input 
                type="text" 
                value={historia_clinica} 
                placeholder="Ingrese la historia clínica"
                onChange={(e) => setHistoria_clinica(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))} 
                required />
                <button type="button" onClick={manejarAgregarOEditar}>
                    {pacienteEditando !== null ? 'Editar' : 'Agregar'}
                </button>
                </form>
                <h2>Lista de Pacientes</h2>
                <table className="tabla-paciente">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Edad</th>
                            <th>Cedula</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Direccion</th>
                            <th>Historia Clinica</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map((paciente: Paciente) => (
                            <tr key={paciente.id}>
                                <td>{paciente.nombre}</td>
                                <td>{paciente.apellido}</td>
                                <td>{paciente.edad}</td>
                                <td>{paciente.cedula}</td>
                                <td>{paciente.telefono}</td>
                                <td>{paciente.correo}</td>
                                <td>{paciente.fecha_nacimiento}</td>
                                <td>{paciente.direccion}</td>
                                <td>{paciente.historia_clinica}</td>
                                <td>
                                    <button className="beliminar" onClick={() => eliminarPaciente(paciente.id)}>Eliminar</button>
                                    <button className="bactualizar" onClick={() => actualizarPaciente(paciente.id)}>Actualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegistrarPaciente;
