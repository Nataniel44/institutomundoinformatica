"use client";

import { useState } from "react";
import { db } from '@/lib/firebase'; // Import db
import { collection, addDoc } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateUserPage() {
  const [form, setForm] = useState({ displayName: "", email: "", role: "student" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await addDoc(collection(db, "users"), {
      ...form,
      createdAt: new Date(),
    });

    setLoading(false);
    setSuccess(true);
    setForm({ displayName: "", email: "", role: "student" });
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Crear nuevo usuario</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input name="name" value={form.displayName} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="role">Rol</Label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="student">Estudiante</option>
            <option value="admin">Administrador</option>
            <option value="teacher">Profesor</option>
          </select>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Usuario"}
        </Button>
      </form>

      {success && <p className="text-green-600">✅ Usuario creado correctamente</p>}
    </div>
  );
}
