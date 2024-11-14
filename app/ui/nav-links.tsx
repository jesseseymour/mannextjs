'use client'

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserCircleIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { SessionProvider } from "next-auth/react";
import { useSession } from 'next-auth/react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
// const links = [
//   { name: 'Home', href: '/', icon: HomeIcon },
//   { name: "Login", href: '/login', icon: UserCircleIcon},
//   { name: 'Profile', href: '/profile', icon: UserCircleIcon },
//   {
//     name: 'Leagues',
//     href: '/leagues',
//     icon: TrophyIcon,
//   },
//   { name: 'Teams', href: '/teams', icon: UserGroupIcon },
// ];

export default function NavLinks() {
  const { data: session, status } = useSession();
  const links = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: status === "authenticated" ? "Logout" : "Login", href: `/api/auth/${status === "authenticated" ? "signout": "signin" }`, icon: UserCircleIcon},
    { name: 'Profile', href: '/profile', icon: UserCircleIcon },
    {
      name: 'Leagues',
      href: '/leagues',
      icon: TrophyIcon,
    },
    { name: 'Teams', href: '/teams', icon: UserGroupIcon },
  ];
  return (
    <SessionProvider>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <LinkIcon className='w-6' />
            <p className='hidden md:block'>{link.name}</p>
          </a>
        );
      })}
    </SessionProvider>
  );
}
