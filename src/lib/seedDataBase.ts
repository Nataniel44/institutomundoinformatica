import { db } from './firebase'; // Asegúrate de exportar 'db' desde tu firebase.ts
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

interface CourseData {
  title: string;
  description: string;
  imageUrl: string;
  classes?: any[]; // Define una interfaz más específica si es necesario
  tasks?: any[]; // Define una interfaz más específica si es necesario
  resources?: any[]; // Define una interfaz más específica si es necesario
}

// Función para agregar datos de prueba a Firestore
export async function seedDatabase() {
  try {
    // Referencias a las colecciones principales
    const coursesCollection = collection(db, 'courses');
    const usersCollection = collection(db, 'users');
    const userCoursesCollection = collection(db, 'userCourses');

    // --- Agregar Cursos de Prueba ---
    const course1Data: CourseData = {
      title: 'Introducción a la Informática Educativa',
      description: 'Aprende los fundamentos y conceptos clave de la informática aplicada a la educación.',
      imageUrl: 'https://placehold.co/600x400.png?text=Curso+1',
      classes: [
        { title: '¿Qué es la Informática Educativa?', order: 1, videoUrl: '#' },
        { title: 'Herramientas Digitales para el Aula', order: 2, videoUrl: '#' },
      ],
      tasks: [
        { title: 'Cuestionario Inicial', description: 'Evalúa tus conocimientos previos.', dueDate: new Date() },
      ],
      resources: [
        { title: 'Presentación Lección 1 (PDF)', url: '#', type: 'pdf' },
      ],
    };

    const course2Data: CourseData = {
      title: 'Diseño de Contenidos Educativos Digitales',
      description: 'Crea materiales didácticos interactivos y atractivos.',
      imageUrl: 'https://placehold.co/600x400.png?text=Curso+2',
      classes: [
        { title: 'Principios de Diseño Instruccional', order: 1, videoUrl: '#' },
        { title: 'Uso de Herramientas de Autoría', order: 2, videoUrl: '#' },
      ],
      tasks: [
        { title: 'Entrega de Proyecto Final', description: 'Diseña tu propio contenido educativo.', dueDate: new Date() },
      ],
      resources: [
        { title: 'Lista de Herramientas Recomendadas', url: '#', type: 'link' },
      ],
    };

    // Agregar curso 1
    const docRef1 = await addDoc(coursesCollection, {
      title: course1Data.title,
      description: course1Data.description,
      imageUrl: course1Data.imageUrl,
      createdAt: new Date(),
    });
    console.log("Curso 1 agregado con ID: ", docRef1.id);

    // Agregar subcolecciones para curso 1
    course1Data.classes?.forEach(async (cls) => {
      await addDoc(collection(db, 'courses', docRef1.id, 'classes'), cls);
    });
    course1Data.tasks?.forEach(async (task) => {
      await addDoc(collection(db, 'courses', docRef1.id, 'tasks'), task);
    });
    course1Data.resources?.forEach(async (resource) => {
      await addDoc(collection(db, 'courses', docRef1.id, 'resources'), resource);
    });

    // Agregar curso 2
    const docRef2 = await addDoc(coursesCollection, {
      title: course2Data.title,
      description: course2Data.description,
      imageUrl: course2Data.imageUrl,
      createdAt: new Date(),
    });
    console.log("Curso 2 agregado con ID: ", docRef2.id);

     // Agregar subcolecciones para curso 2
     course2Data.classes?.forEach(async (cls) => {
      await addDoc(collection(db, 'courses', docRef2.id, 'classes'), cls);
    });
    course2Data.tasks?.forEach(async (task) => {
      await addDoc(collection(db, 'courses', docRef2.id, 'tasks'), task);
    });
    course2Data.resources?.forEach(async (resource) => {
      await addDoc(collection(db, 'courses', docRef2.id, 'resources'), resource);
    });

    // --- Agregar Usuario de Prueba (si no existe) ---
    // Para simplificar, usaremos un UID de ejemplo.
    // En una aplicación real, obtendrías el UID del usuario autenticado.
    const testUserId = 'test-user-id'; // Reemplaza con un UID real si tienes usuarios

    const userDocRef = doc(usersCollection, testUserId);
    await setDoc(userDocRef, {
        displayName: 'Usuario de Prueba',
        email: 'prueba@ejemplo.com',
        createdAt: new Date(),
    }, { merge: true }); // Usamos merge para no sobrescribir si el usuario ya existe
    console.log("Usuario de prueba agregado/actualizado con ID: ", testUserId);


    // --- Registrar Inscripciones de Prueba ---
    // Simular que el usuario de prueba está inscrito en ambos cursos.
    await addDoc(userCoursesCollection, {
      userId: testUserId,
      courseId: docRef1.id, // ID del Curso 1
      enrolledAt: new Date(),
    });
    console.log(`Inscripción de ${testUserId} al Curso 1 registrada.`);

    await addDoc(userCoursesCollection, {
      userId: testUserId,
      courseId: docRef2.id, // ID del Curso 2
      enrolledAt: new Date(),
    });
     console.log(`Inscripción de ${testUserId} al Curso 2 registrada.`);


    console.log('Base de datos poblada con datos de prueba.');

  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  }
}

// Ejemplo de cómo llamar a la función (puedes poner esto en un botón en una página de administración)
// 
