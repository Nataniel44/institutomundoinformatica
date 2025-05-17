
"use client"; // Asegúrate de tener esto si usas hooks o interactividad del cliente

import { Button } from "@/components/ui/button"; // Asegúrate de que la ruta sea correcta
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Importa componentes de Card si los tienes
import Image from 'next/image'; // Importa Image de Next.js para optimización de imágenes


export default function HomePage() {
  // Datos de ejemplo para cursos y testimonios
  const featuredCourses = [
    {
      id: 1,
      title: "Introducción a la informática",
      description: "Adquiere conocimientos básicos sobre el uso de computadoras y software esenciales.",
      imageUrl: "/ins-inf.jpeg",
      link: "/courses/introduccion-informatica"
    },
    {
      id: 2,
      title: "Operador de PC",
      description: "Domina el manejo del sistema operativo y las herramientas ofimáticas más utilizadas.",
      imageUrl: "/op-pc.jpeg",
      link: "/courses/operador-pc"
    },
    {
      id: 3,
      title: "Secretaría Administrativa",
      description: "Aprende técnicas para la gestión de oficinas, redacción y tareas administrativas.",
      imageUrl: "/sec-adm.jpeg",
      link: "/courses/secretaria-administrativa"
    },
    {
      id: 4,
      title: "Técnicas de administración de empresas",
      description: "Conoce las herramientas clave para el manejo eficiente de una empresa moderna.",
      imageUrl: "/tec-adm-emp.jpeg",
      link: "/courses/administracion-empresas"
    },
    {
      id: 5,
      title: "Técnicas Administrativas",
      description: "Refuerza habilidades para el control y organización de procesos administrativos.",
      imageUrl: "/tec-adm.jpeg",
      link: "/courses/tecnicas-administrativas"
    },
    {
      id: 6,
      title: "Técnicas Auxiliares",
      description: "Desarrolla competencias para apoyar en tareas operativas y administrativas.",
      imageUrl: "/tec-aux.jpeg",
      link: "/courses/tecnicas-auxiliares"
    },
    {
      id: 7,
      title: "Técnicas Avanzadas",
      description: "Profundiza en conceptos y técnicas para una gestión administrativa avanzada.",
      imageUrl: "/tec-avan.jpeg",
      link: "/courses/tecnicas-avanzadas"
    },
    {
      id: 8,
      title: "Técnicas Superiores",
      description: "Integra conocimientos superiores para la toma de decisiones administrativas.",
      imageUrl: "/tec-sup.jpeg",
      link: "/courses/tecnicas-superiores"
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
          <div className="flex justify-center gap-4 animate-fade-in-up">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">Explorar Cursos</Button>
            <Button size="lg" variant="link" className="text-white border-white hover:bg-white hover:text-blue-600">Regístrate Ahora</Button>
            
          </div>

        </div>
      </section>

      {/* Sección Cursos Destacados */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Nuestros Cursos Destacados
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <Card key={course.id} className="flex flex-col">
                <Image
                    src={course.imageUrl}
                    alt={course.title}
                    width={600}
                    height={400}
                    className="rounded-t-lg object-cover object-top w-full "
                />
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {/* Contenido adicional del curso si es necesario */}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <a href={course.link}>Más Información</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
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
