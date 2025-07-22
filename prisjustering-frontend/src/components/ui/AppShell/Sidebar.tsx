// src/components/ui/AppShell/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Velkommen' },
  { to: '/prisliste', label: 'Prisliste' },
  { to: '/artikler', label: 'Artikler' },
  { to: '/grunndata', label: 'Grunndata' },
];

export default function Sidebar() {
  return (
    <nav className="h-full p-4 flex flex-col space-y-2 bg-gray-50 border-r">
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
