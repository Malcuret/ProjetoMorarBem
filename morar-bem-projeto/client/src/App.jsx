import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Imoveis } from './pages/Imoveis';
import { DetalhesImovel } from './pages/DetalhesImovel';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Aninhamento com MainLayout aplica a Navbar/Footer em todas essas rotas */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="imoveis" element={<Imoveis />} />
          <Route path="imoveis/:id" element={<DetalhesImovel />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;