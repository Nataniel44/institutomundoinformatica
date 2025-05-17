"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function AdminCoursesPage() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const coursesSnap = await getDocs(collection(db, "courses"));
        const coursesData = coursesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
      } catch (err) {
        setError("Error al cargar cursos");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin mb-2 text-gray-500" />
        <p className="text-muted-foreground">Cargando cursos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Cursos</h1>

      {courses.length === 0 ? (
        <p className="text-center text-muted-foreground">No hay cursos registrados.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => (
            <div
              key={course.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
             
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-sm text-muted-foreground flex-grow">{course.description}</p>
                <Link
                  href={`/admin/courses/${course.id}`}
                  className="mt-4 inline-block text-primary hover:underline self-start"
                >
                  Ver detalles / Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
