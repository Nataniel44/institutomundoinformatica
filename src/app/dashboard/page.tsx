"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link'; // Import Link
import { Loader2, BookOpenCheck } from 'lucide-react';

import { db } from '@/lib/firebase'; // Import db
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { useState } from 'react'; // Import useState


export default function DashboardPage() {
  const { user, loading, signOutUser } = useAuth();
  const router = useRouter();
  function handleNavigateWithTransition(href: string) {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(href);
      });
    } else {
      router.push(href);
    }
  }
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]); // State to store enrolled courses
  const [coursesLoading, setCoursesLoading] = useState(true); // Loading state for courses
  const [coursesError, setCoursesError] = useState<string | null>(null); // Error state for courses
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) return; // Don't fetch if user is not available

      try {
        setCoursesLoading(true);
        setCoursesError(null);
        const userCoursesQuery = query(collection(db, 'userCourses'), where('userId', '==', user.uid));
        const userCoursesSnapshot = await getDocs(userCoursesQuery);
     

        const courseIds = userCoursesSnapshot.docs.map(doc => doc.data().courseId);

        const coursesData = await Promise.all(courseIds.map(async (courseId) => {
          const courseDocRef = doc(db, 'courses', courseId);
        
          const courseDoc = await getDoc(courseDocRef);
          if (courseDoc.exists()) {
            return { id: courseDoc.id, ...courseDoc.data() };
          }
          return null; // Or handle case where course doc doesn't exist
        }));
        
        setEnrolledCourses(coursesData.filter(course => course !== null));
      } catch (err: any) {
        setCoursesError('Error loading courses: ' + err.message);
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, [user]); // Refetch when user changes

  if (loading || !user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Cargando panel de control...</p>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/login');
  };

  return (
    <div className="space-y-8 ">
      <div className="text-3xl font-bold text-primary">
      ¡Hola {user.displayName || user.email?.split('@')[0] || 'Usuario'}! 👋
        
      {/* Cargando */}
      {coursesLoading && !coursesError && (
        <div className="text-muted-foreground font-light text-lg pt-20 flex flex-col justify-center items-center text-center">
           <Loader2 className="h-12 w-12 animate-spin text-primary mb-4 " />
          Cargando tus cursos inscritos...
          
        </div>
      )}
      

      {/* No tiene cursos */}
      {!coursesLoading && enrolledCourses.length === 0 && !coursesError && (
  <div className="text-center space-y-4 text-muted-foreground py-10">
    <p className="text-lg">Aún no estás inscrito en ningún curso.</p>
    <p>Explorá los cursos disponibles y comenzá a aprender hoy mismo 🚀</p>
    <Link href="/" passHref>
      <Button className="bg-primary text-white hover:bg-primary/90">
        Ir al Inicio →
      </Button>
    </Link>
  </div>
)}

      {/* Tiene cursos */}
      {!coursesLoading && enrolledCourses.length > 0 && (
        <div className="shadow-lg border-primary/20 mt-6">
          <CardTitle className="text-2xl font-bold text-primary">Tus Cursos Inscritos</CardTitle>
          <CardDescription className="text-muted-foreground">
            Ingresá al curso para ver las clases, materiales y avanzar.
          </CardDescription>

          <CardContent className="bg-muted-foreground/20 rounded-lg p-4 mt-3">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="group border border-muted/20 hover:shadow-md transition duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary group-hover:underline">
                      {course.title}
                    </CardTitle>
                    {course.description && (
                      <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                        {course.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Nivel: <strong>{course.level || 'General'}</strong>
                    </span>
                  
                      <Button onClick={() => handleNavigateWithTransition(`/courses/${course.id}`)} size="sm" variant="outline">Ver Curso →</Button>
                   
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </div>
      )}
    </div>
  </div>

  );
}
