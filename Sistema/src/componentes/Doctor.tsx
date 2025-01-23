
import React, { useState } from 'react';

interface Asignacion {
    id: number;
    idDoctor: number;
    idPaciente: number;
    fecha: string;
};
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

interface PropsDoctor {
    doctores: Doctor[];
    setDoctores: React.Dispatch<React.SetStateAction<Doctor[]>>;
    asignaciones: Asignacion[];

};

const RegistrarDoctor: React.FC<PropsDoctor> = ({
    doctores,
    setDoctores,
    asignaciones
}) => {
    const [nombre, setNombre] = useState<string>('');
    const [apellido, setApellido] = useState<string>('');
    const [especialidad, setEspecialidad] = useState<string>('');
    const [cedula, setCedula] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [correo, setCorreo] = useState<string>('');
    const [horario, setHorario] = useState<string>('');
    const [doctorEditando, setDoctorEditando] = useState<number | null>(null);

    const manejarAgregarOEditar = () => {
        if (nombre.trim() && apellido.trim() && especialidad.trim() && cedula.trim() && telefono.trim() && correo.trim() && horario.trim()) {
            if (doctorEditando !== null) {
                setDoctores(
                    doctores.map((doctor) =>
                        doctor.id === doctorEditando ? { ...doctor, nombre, apellido, especialidad, cedula, telefono, correo, horario } : doctor
                    )
                );
                setDoctorEditando(null);
            } else {
                const nuevoDoctor: Doctor = {
                    id: doctores.length + 1,
                    nombre,
                    apellido,
                    especialidad,
                    cedula,
                    telefono,
                    correo,
                    horario
                };
                setDoctores([...doctores, nuevoDoctor]);
            }
            setNombre('');
            setApellido('');
            setEspecialidad('');
            setCedula('');
            setTelefono('');
            setCorreo('');
            setHorario('');
        } else {
            alert('Todos los campos son requeridos');
        }
    };

    /*const eliminarDoctor = (id: number) => {
        const doctoresFiltrados = doctores.filter((doctor) => doctor.id !== id);
        setDoctores(doctoresFiltrados);
    };*/

    const eliminarDoctor = (id: number) => {
        const docAsignado = asignaciones.some((asignacion) => asignacion.idDoctor === id);
        if (docAsignado) {
            alert('No se puede eliminar el doctor porque tiene pacientes asignados.');
            return;
        } else {
            const doctoresFiltrados = doctores.filter((doctor) => doctor.id !== id);
            setDoctores(doctoresFiltrados);
        }
    };

    const actualizarDoctor = (id: number) => {
        const doctor = doctores.find((doctor) => doctor.id === id);
        if (doctor) {
            setNombre(doctor.nombre);
            setApellido(doctor.apellido);
            setEspecialidad(doctor.especialidad);
            setCedula(doctor.cedula);
            setTelefono(doctor.telefono);
            setCorreo(doctor.correo);
            setHorario(doctor.horario);
            setDoctorEditando(doctor.id);
        }
    };
    return (
        <div className='contenedor-doctor'>
            <div className="titulo">
                <h1>Doctores</h1>
            </div>
            <div className="formDoc">
                <form>
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre" 
                        required 
                        pattern="[A-Za-z\s]+"
                        title="El nombre solo debe contener letras y espacios" />
                    <label>Apellido</label>
                    <input 
                        type="text" 
                        value={apellido} 
                        onChange={(e) => setApellido(e.target.value)}
                        placeholder="Apellido" 
                        required 
                        pattern="[A-Za-z\s]+"
                        title="El apellido solo debe contener letras y espacios" />
                    <label>Especialidad</label>
                    <select
                        value={especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                        required
>
                        <option value="" disabled>Seleccione una especialidad</option>
                        <option value="Medicina General">Medicina General</option>
                        <option value="Pediatría">Pediatría</option>
                        <option value="Cardiología">Cardiología</option>
                        <option value="Neurología">Neurología</option>
                        <option value="Ginecología">Ginecología</option>
                        <option value="Traumatología">Traumatología</option>
                        <option value="Dermatología">Dermatología</option>
                        <option value="Psiquiatría">Psiquiatría</option>
                    </select>
                    <label>Cedula</label>
                    <input 
                        type="number" 
                        value={cedula} 
                        onChange={(e) => setCedula(e.target.value)}
                        placeholder="Cedula" 
                        required 
                        maxLength={10}
                        title="La cédula solo debe contener números y tener un máximo de 10 dígitos" />  
                    <label>Telefono</label>
                    <input 
                        type="text" 
                        value={telefono} 
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="Telefono" 
                        required 
                        pattern="\d+"
                        title="El teléfono solo debe contener números" />
                    <label>Correo</label>
                    <input 
                        type="email" 
                        value={correo} 
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="Correo" 
                        required 
                        pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                        title="Ingrese un correo electrónico válido" />  <label>Horario</label>
                    <input 
                        type="text" 
                        value={horario} 
                        onChange={(e) => setHorario(e.target.value)}
                        placeholder="Horario" 
                        required 
                        pattern="[A-Za-z0-9\s]+"
                        title="El horario solo debe contener letras, números y espacios" />
                    <button type="button" onClick={manejarAgregarOEditar}>
                        {doctorEditando !== null ? 'Editar' : 'Agregar'}
                    </button>
                </form>
                <h2>Lista de Doctores</h2>
                <table className='tabla-doctor'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Especialidad</th>
                            <th>Cedula</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                            <th>Horario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctores.map((doctor) => (
                            <tr key={doctor.id}>
                                <td>{doctor.nombre}</td>
                                <td>{doctor.apellido}</td>
                                <td>{doctor.especialidad}</td>
                                <td>{doctor.cedula}</td>
                                <td>{doctor.telefono}</td>
                                <td>{doctor.correo}</td>
                                <td>{doctor.horario}</td>
                                <td>
                                    <button className='beliminar' onClick={() => eliminarDoctor(doctor.id)}>Eliminar</button>
                                    <button className='bactualizar' onClick={() => actualizarDoctor(doctor.id)}>Actualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
               
export default RegistrarDoctor;