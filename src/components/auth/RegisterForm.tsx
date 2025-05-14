"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import type { RegisterFormData } from '@/types';
import { registerSchema } from '@/lib/schemas';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2, UserPlus } from 'lucide-react';

export function RegisterForm() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    const user = await signUp(data);
    setIsLoading(false);
    if (user) {
      router.push('/dashboard');
    }
  }

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">Create an Account</CardTitle>
        <CardDescription>Join Mundo Informática Educativa today!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email-register">Email</FormLabel>
                  <FormControl>
                    <Input id="email-register" type="email" placeholder="you@example.com" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password-register">Password</FormLabel>
                  <FormControl>
                    <Input id="password-register" type="password" placeholder="•••••••• (min. 6 characters)" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword-register">Confirm Password</FormLabel>
                  <FormControl>
                    <Input id="confirmPassword-register" type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-sm text-center block">
         {/* Optional footer content */}
      </CardFooter>
    </Card>
  );
}
