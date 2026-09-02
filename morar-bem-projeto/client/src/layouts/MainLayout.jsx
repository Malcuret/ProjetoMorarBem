import { Link, Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div>
      {/* Cabeçalho Fixo */}
      <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '20px' }}>
        <strong>Morar Bem</strong>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <Link to="/">Início</Link>
          <Link to="/imoveis">Imóveis</Link>
        </nav>
      </header>

      {/* Onde a página atual é renderizada */}
      <main style={{ minHeight: '80vh', padding: '1rem' }}>
        <Outlet />
      </main>

      {/* Rodapé Fixo */}
      <footer style={{ padding: '1rem', borderTop: '1px solid #ccc', textAlign: 'center' }}>
        <p>&copy; 2026 Imobiliária Morar Bem. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default MainLayout;