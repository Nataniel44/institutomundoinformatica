"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CoursePage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseRef = doc(db, "courses", courseId as string);
        const courseSnap = await getDoc(courseRef);
        if (courseSnap.exists()) {
          setCourse({ id: courseSnap.id, ...courseSnap.data() });
        } else {
          setCourse(null);
        }
      } catch (error) {
        console.error("Error loading course:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return <p className="text-center text-destructive">El curso no fue encontrado.</p>;
  }

  return (
    <div className="py-8 max-w-4xl mx-auto space-y-6">
      <Card className="shadow-md border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl text-primary font-bold">{course.title}</CardTitle>
          <CardDescription className="text-muted-foreground text-lg">{course.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Duración:</strong> {course.duration || "No especificada"}</p>
          <p><strong>Nivel:</strong> {course.level || "General"}</p>
          {/* Puedes agregar más datos como recursos, módulos, etc. */}
        </CardContent>
      </Card>

      <div className="text-center">
        <Button variant="outline" onClick={() => router.back()}>← Volver al Dashboard</Button>
      </div>
    </div>
  );
}
