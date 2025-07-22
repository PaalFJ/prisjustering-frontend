import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationMenu } from '@/components/shadcn/navigation-menu';
import Sidebar from './Sidebar';

/**
 * AppShell.tsx
 * -------------------
 * Hovedlayout for applikasjonen. Denne komponenten pakker alle sider inn i en Sidebar og hovedinnhold.
 *
 * - React.FC: Type for funksjonelle komponenter med TypeScript.
 * - Outlet: Plassholder for nested routes fra react-router-dom.
 * - NavigationMenuComponent: Gjenbrukbar navigasjonsmeny fra shadcn/ui.
 */

// Props-typen for AppShell. children tillater oss å rendere innhold eller nested routes.
interface AppShellProps {
  children?: React.ReactNode;
}

const AppShell: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar: Inneholder hovednavigasjon */}
      <aside className="w-64 bg-gray-50 border-r">
        <Sidebar />
      </aside>

      {/* Main content: Header + sideinnhold */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header: Valgfri global topptekst */}
        <header className="p-4 border-b bg-white">
          <h1 className="text-xl font-semibold">Prisjustering App</h1>
        </header>

        {/* Hovedinnhold: Outlet rendrer nested routes */}
        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;