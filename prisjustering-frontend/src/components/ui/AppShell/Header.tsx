// src/components/ui/AppShell/Header.tsx
import React from 'react';

/**
 * Header.tsx
 *  - Øvre stripe med app-tittel eller global handling
 */

const Header: React.FC = () => (
  <header className="p-4 border-b bg-white">
    <h1 className="text-xl font-semibold">Prisjustering App</h1>
  </header>
);

export default Header;
