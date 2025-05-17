"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        setLoading(true);
        const docRef = doc(db, "courses", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCourse({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Curso no encontrado");
        }
      } catch (err) {
        setError("Error al cargar el curso");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin mb-2 text-gray-500" />
        <p className="text-muted-foreground">Cargando curso...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-8">
        <p>{error}</p>
        <Link href="/admin/courses" className="text-primary hover:underline block mt-4">
          Volver a cursos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">{course.title}</h1>

      {course.imageUrl && (
        <img src={course.imageUrl} alt={course.title} className="w-full h-64 object-cover rounded-md" />
      )}

      <div>
        <p className="text-muted-foreground">{course.description}</p>
      </div>

      <div className="text-sm text-muted-foreground">
        <p><strong>Link:</strong> <code>{course.link}</code></p>
        <p><strong>ID:</strong> {course.id}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <Link
          href="/admin/courses"
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
        >
          Volver
        </Link>

        {/* Aquí podrías agregar botón para editar en el futuro */}
        {/* <Link href={`/admin/courses/${course.id}/edit`} className="text-sm text-primary hover:underline">
          Editar curso
        </Link> */}
      </div>
    </div>
  );
}
