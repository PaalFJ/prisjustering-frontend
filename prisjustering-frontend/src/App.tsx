// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/ui/AppShell/AppShell';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import PriceListPage from './pages/PriceListPage/PriceListPage';
import ArticlesPage from './pages/ArticlesPage/ArticlesPage';
import MasterDataPage from './pages/MasterDataPage/MasterDataPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Alt under AppShell */}
        <Route path="/" element={<AppShell />}>
          <Route index element={<WelcomePage />} />
          <Route path="prisliste" element={<PriceListPage />} />
          <Route path="artikler" element={<ArticlesPage />} />
          <Route path="grunndata" element={<MasterDataPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
