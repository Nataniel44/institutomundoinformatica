import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';

// GeistSans and GeistMono are already font objects when imported.
// We don't need to call them as functions.
// Their .variable properties (e.g., GeistSans.variable) are automatically available.

export const metadata: Metadata = {
  title: 'Mundo Informática Educativa',
  description: 'Plataforma de aprendizaje interactivo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <Header />
          <main className="container mx-auto px-4 py-8 flex-grow">
            {children}
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
