
"use client"; // Asegúrate de tener esto si usas hooks o interactividad del cliente
import { useState } from "react";

import { Button } from "@/components/ui/button"; // Asegúrate de que la ruta sea correcta
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Importa componentes de Card si los tienes
import Image from 'next/image'; // Importa Image de Next.js para optimización de imágenes


export default function HomePage() {  
  const [openDetails, setOpenDetails] = useState<{ [key: number]: boolean }>({});

const toggleDetails = (id: number) => {
  setOpenDetails((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
};

  // Datos de ejemplo para cursos y testimonios
 const featuredCourses = [
  {
    id: 1,
    title: "Introducción a la informática",
    description: "Adquiere conocimientos básicos sobre el uso de computadoras y software esenciales.",
    imageUrl: "/ins-inf.jpeg",
    link: "/courses/introduccion-informatica",
    items: ["Uso básico de PC", "Microsoft Word", "Microsoft Excel", "Navegación en Internet"]
  },
  {
    id: 2,
    title: "Operador de PC",
    description: "Domina el manejo del sistema operativo y las herramientas ofimáticas más utilizadas.",
    imageUrl: "/op-pc.jpeg",
    link: "/courses/operador-pc",
    items: ["Windows 10/11", "Gestión de archivos", "Microsoft Office", "Seguridad básica"]
  },
  {
    id: 3,
    title: "Secretaría Administrativa",
    description: "Aprende técnicas para la gestión de oficinas, redacción y tareas administrativas.",
    imageUrl: "/sec-adm.jpeg",
    link: "/courses/secretaria-administrativa",
    items: ["Redacción comercial", "Atención telefónica", "Organización de agendas", "Correspondencia"]
  },
  {
    id: 4,
    title: "Técnicas de administración de empresas",
    description: "Conoce las herramientas clave para el manejo eficiente de una empresa moderna.",
    imageUrl: "/tec-adm-emp.jpeg",
    link: "/courses/administracion-empresas",
    items: ["Excel avanzado", "PowerPoint", "Gestión de proyectos", "Contabilidad básica"]
  },
  {
    id: 5,
    title: "Técnicas Administrativas",
    description: "Refuerza habilidades para el control y organización de procesos administrativos.",
    imageUrl: "/tec-adm.jpeg",
    link: "/courses/tecnicas-administrativas",
    items: ["Control documental", "Archivo y clasificación", "Gestión de inventarios", "Atención al cliente"]
  },
  {
    id: 6,
    title: "Técnicas Auxiliares",
    description: "Desarrolla competencias para apoyar en tareas operativas y administrativas.",
    imageUrl: "/tec-aux.jpeg",
    link: "/courses/tecnicas-auxiliares",
    items: ["Apoyo en recepción", "Manejo de correspondencia", "Asistencia administrativa", "Manejo básico de software"]
  },
  {
    id: 7,
    title: "Técnicas Avanzadas",
    description: "Profundiza en conceptos y técnicas para una gestión administrativa avanzada.",
    imageUrl: "/tec-avan.jpeg",
    link: "/courses/tecnicas-avanzadas",
    items: ["Planificación estratégica", "Análisis financiero", "Gestión de recursos humanos", "Liderazgo"]
  },
  {
    id: 8,
    title: "Técnicas Superiores",
    description: "Integra conocimientos superiores para la toma de decisiones administrativas.",
    imageUrl: "/tec-sup.jpeg",
    link: "/courses/tecnicas-superiores",
    items: ["Toma de decisiones", "Políticas empresariales", "Evaluación de proyectos", "Gestión del cambio"]
  }
];


  const testimonials = [
    {
      id: 1,
      quote: "Este instituto cambió mi vida. Los profesores son excelentes y el contenido del curso es muy relevante.",
      author: "Ana García"
    },
    {
      id: 2,
      quote: "La plataforma es muy fácil de usar y los cursos son muy completos. ¡Altamente recomendado!",
      author: "Juan Pérez"
    },
    // Añade más testimonios si es necesario
  ];

  return (
    <div>
      {/* Sección Hero */}
      <section className="relative w-full h-[600px] bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-center text-white overflow-hidden">
        {/* Puedes añadir una imagen de fondo o un patrón aquí */}
        <div className="absolute inset-0 z-0">
            
             <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay oscuro */}
        </div>
        <div className="container z-10 px-4 md:px-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 animate-fade-in-down">
            Transforma tu Futuro con Educación de Calidad
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up">
            Descubre una nueva forma de aprender y alcanza tus metas profesionales.
          </p>
          <div className="flex justify-center gap-4 md:flex-row flex-col animate-fade-in-up">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">Explorar Cursos</Button>
            <Button size="lg" variant="link" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
              <a href="/register">Regístrate Ahora</a>
            </Button>
            
          </div>

        </div>
      </section>

   
      {/* Sección Cursos Destacados */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Nuestros Cursos Destacados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => {
              const isOpen = openDetails[course.id] || false;
              return (
                <Card key={course.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative w-full h-72">
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      className="rounded-t-lg object-cover object-top"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-3">{course.description}</CardDescription>
                  </CardHeader>
                  
                  {/* En pantallas sm en adelante mostramos el listado siempre */}
                  {/* En sm para abajo mostramos un botón para desplegar */}
                  <CardContent className="flex-grow">
                    {/* Botón desplegable solo en sm y menos */}
                    <div className="sm:hidden mb-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleDetails(course.id)}
                        aria-expanded={isOpen}
                        aria-controls={`details-${course.id}`}
                        className="w-full"
                      >
                        {isOpen ? "Ocultar detalles ▲" : "Mostrar detalles ▼"}
                      </Button>
                    </div>

                    {/* Lista visible en md+ o si está abierto en sm- */}
                    <ul
                      id={`details-${course.id}`}
                      className={`list-disc list-inside text-sm text-gray-600 space-y-1
                        ${isOpen ? "block" : "hidden"} sm:block`}
                    >
                      {course.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href={course.link} aria-label={`Más información sobre ${course.title}`}>
                        Más Información
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
 

      {/* Sección Testimonios */}
      <section className="w-full py-16 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Lo que dicen nuestros estudiantes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map(testimonial => (
                <Card key={testimonial.id} className="flex flex-col justify-between">
                    <CardContent className="pb-0">
                        <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                    </CardContent>
                    <CardFooter className="justify-end pt-0">
                        <p className="text-gray-600 font-semibold">- {testimonial.author}</p>
                    </CardFooter>
                </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Aquí añadirías las secciones "Sobre Nosotros" y Call to Action final */}

    </div>
  );
}
