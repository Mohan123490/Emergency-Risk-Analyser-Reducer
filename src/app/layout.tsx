import type { Metadata } from 'next';
import './globals.css';
import { AppStateProvider } from '@/context/AppStateContext';

export const metadata: Metadata = {
  title: 'SURAKSHA 360 | Smart Public Safety & Crowd Intelligence Platform',
  description: 'Smart Public Safety, Crowd Intelligence, Community Assistance, and Emergency Response Platform for Kerala Festivals, Stadiums & Gatherings.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-sky-500 selection:text-white">
        <AppStateProvider>
          {children}
        </AppStateProvider>
      </body>
    </html>
  );
}
