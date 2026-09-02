import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>404 - Página Não Encontrada</h1>
            <p>A página que você está procurando não existe.</p>
            <Link to="/">Voltar para a página inicial</Link>
        </div>
    )
}

export default NotFound;