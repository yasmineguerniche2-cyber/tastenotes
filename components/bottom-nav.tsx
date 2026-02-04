'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/map', label: 'Carte' },
  { href: '/reviews/new', label: 'Ajouter' },
  { href: '/lists', label: 'Listes' },
  { href: '/profiles/demo', label: 'Profil' }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex flex-col items-center text-xs font-medium',
              active ? 'text-brand-600' : 'text-slate-500'
            )}
          >
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
