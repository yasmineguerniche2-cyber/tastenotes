import './globals.css';
import type { Metadata } from 'next';
import { BottomNav } from '@/components/bottom-nav';

export const metadata: Metadata = {
  title: 'Tasteboxd — Découvrez, notez, partagez vos restaurants',
  description: 'Une plateforme à la Letterboxd pour les restaurants.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="pb-24">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
