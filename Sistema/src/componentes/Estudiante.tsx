import React from "react";

const Estudiante: React.FC = () => {
    const estudiante = {
      nombre: "Jordan Gahona",
      descripcion: `
        Estudiante de la Prestigiosa Universidad de las Fuerzas Armadas ESPE. 
        Cursando la carrera de Ingeniería en Tecnologías de la Información.
        Actualmente en el 6to semestre.
        Conocimientos en programación en lenguajes como Java, Python, C++, C#, JavaScript, HTML, CSS.
        Poseo una vasta experiencia en la administración de negocios y atención al cliente.
        Fui Marinero Mercante encargado del transporte de combustible y apoyo de la Isla Santa Cruz - Galápagos.
      `,
      nombre1: "Experiencia Laboral",
      experienciaLaboral: `
        <ul>
          <li>Estudié en la Unidad Educativa Nacional Galápagos, Bachillerato en 'Ciencias' especializado en 'Físico Matemáticas'</li>
          <li>Gerente de la tienda Mini-Market 'Cucube', alrededor de 4 años</li>
          <li>Encargado de la atención al cliente y administración del Mini-Market</li>
          <li>Marinero mercante en la empresa Pacific Divers siendo tripulante de la Gabarra Orca por 11 meses</li>
          <li>Conocimientos en el manejo de hotelería, restaurantes y bares</li>
        </ul>
      `,
      nombre2: "Habilidades Blandas",
      habilidadesBlandas: `
        <ul>
          <li>Participo en proyectos con energía, en muchos casos liderando equipos para completar objetivos propuestos</li>
          <li>En el colegio tomé la iniciativa para el proyecto 'Limpieza Costera'</li>
          <li>Habilidad para manejar conflictos y buscar soluciones óptimas</li>
          <li>Alta adaptabilidad a cualquier entorno, gracias a mi afán de ayudar</li>
          <li>Capacidad de autocontrol e inteligencia emocional, buscando el equilibrio en cualquier situación</li>
          <li>Perspectiva amplia y capacidad para generar múltiples soluciones ante cualquier problema</li>
        </ul>
      `,
    };
  
    return (
      <div className="estudiante-container">
        <div className="card-imagen">
          <img src="https://placehold.co/600x400" alt="Default Image" />
        </div>
        <div className="estudiante-cabeza">{estudiante.nombre}</div>
        <div className="estudiante-description">{estudiante.descripcion}</div>
        <div className="estudiante-subtitulo">{estudiante.nombre1}</div>
        <div
          className="estudiante-experiencia"
          dangerouslySetInnerHTML={{ __html: estudiante.experienciaLaboral }}
        ></div>
        <div className="estudiante-subtitulo2">{estudiante.nombre2}</div>
        <div
          className="estudiante-habilidades"
          dangerouslySetInnerHTML={{ __html: estudiante.habilidadesBlandas }}
        ></div>
      </div>
    );
  };

export default Estudiante;