"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, BookOpenCheck } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  const { user, loading, signOutUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }
  
  const handleSignOut = async () => {
    await signOutUser();
    router.push('/login');
  };

  return (
    <div className="space-y-8 py-8">
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            Welcome to Your Dashboard, {user.displayName || user.email?.split('@')[0] || 'User'}!
          </CardTitle>
          <CardDescription className="text-lg">
            This is your personal space in Mundo Informática Educativa.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            You are logged in as: <strong className="text-foreground">{user.email}</strong>
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3 flex items-center">
                <BookOpenCheck className="mr-2 h-6 w-6 text-accent" />
                Start Your Learning Journey
              </h3>
              <p className="text-muted-foreground mb-4">
                Explore courses, track your progress, and enhance your knowledge in educational informatics. 
                We&apos;re excited to have you here!
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Explore Courses (Coming Soon)
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
               <Image 
                src="https://placehold.co/600x400.png" 
                alt="Educational illustration" 
                width={600} 
                height={400}
                className="w-full h-auto object-cover"
                data-ai-hint="education technology"
              />
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            More features and content will be available soon. Stay tuned!
          </p>
          
        </CardContent>
      </Card>

       <div className="text-center mt-8">
          <Button onClick={handleSignOut} variant="destructive" className="bg-destructive/90 hover:bg-destructive">
            Sign Out
          </Button>
        </div>
    </div>
  );
}
