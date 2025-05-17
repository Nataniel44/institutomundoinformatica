"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Book, CreditCard, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from '@/lib/firebase';
import { collection, getDocs } from "firebase/firestore";
import { Loader2 } from "lucide-react";

export default function AdminHomePage() {
  const [loading, setLoading] = useState(true);
  const [usersCount, setUsersCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);

      const usersSnap = await getDocs(collection(db, "users"));
      const coursesSnap = await getDocs(collection(db, "courses"));
      const paymentsSnap = await getDocs(collection(db, "payments"));

      setUsersCount(usersSnap.size);
      setCoursesCount(coursesSnap.size);
      setPaymentsCount(paymentsSnap.size);

      setLoading(false);
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin mb-2 text-gray-500" />
        <p className="text-muted-foreground">Cargando datos del panel...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center sm:text-left">Panel de Administración</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <Link href="/admin/users" className="flex flex-col sm:flex-row justify-between items-center p-6 gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-lg font-semibold">Usuarios</p>
                <p className="text-sm text-muted-foreground">Ver todos los usuarios</p>
              </div>
            </div>
            <div className="text-center sm:text-right w-full sm:w-auto">
              <p className="text-2xl font-bold">{usersCount}</p>
              <p className="text-sm text-muted-foreground">Registrados</p>
            </div>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <Link href="/admin/courses" className="flex flex-col sm:flex-row justify-between items-center p-6 gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Book className="w-8 h-8 text-primary" />
              <div>
                <p className="text-lg font-semibold">Cursos</p>
                <p className="text-sm text-muted-foreground">Gestionar cursos</p>
              </div>
            </div>
            <div className="text-center sm:text-right w-full sm:w-auto">
              <p className="text-2xl font-bold">{coursesCount}</p>
              <p className="text-sm text-muted-foreground">Activos</p>
            </div>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <Link href="/admin/payments" className="flex flex-col sm:flex-row justify-between items-center p-6 gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <CreditCard className="w-8 h-8 text-primary" />
              <div>
                <p className="text-lg font-semibold">Pagos</p>
                <p className="text-sm text-muted-foreground">Ver estado de pagos</p>
              </div>
            </div>
            <div className="text-center sm:text-right w-full sm:w-auto">
              <p className="text-2xl font-bold">{paymentsCount}</p>
              <p className="text-sm text-muted-foreground">Procesados</p>
            </div>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <Link href="/admin/users/create" className="flex items-center gap-4 p-6">
            <PlusCircle className="w-8 h-8 text-primary" />
            <div>
              <p className="text-lg font-semibold">Nuevo Usuario</p>
              <p className="text-sm text-muted-foreground">Crear un usuario manualmente</p>
            </div>
          </Link>
        </Card>
      </div>

      <div className="mt-8 max-w-md mx-auto sm:mx-0">
        <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">Navegación rápida</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>
            <Link href="/admin/users" className="text-primary hover:underline block text-center sm:text-left">
              Administrar Usuarios
            </Link>
          </li>
          <li>
            <Link href="/admin/users/create" className="text-primary hover:underline block text-center sm:text-left">
              Crear Usuario
            </Link>
          </li>
          <li>
            <Link href="/admin/courses" className="text-primary hover:underline block text-center sm:text-left">
              Administrar Cursos
            </Link>
          </li>
          <li>
            <Link href="/admin/courses/create" className="text-primary hover:underline block text-center sm:text-left">
              Crear Cursos
            </Link>
          </li>
          <li>
            <Link href="/admin/payments" className="text-primary hover:underline block text-center sm:text-left">
              Revisar Pagos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
