import { Link } from 'react-router-dom';

export default function ImovelCard({ imovel }) {
    return (
        <article className="property-card">
            <img
                src={imovel.imagens[0]}
                alt={imovel.titulo}
            />

            <div>
                <p>Código {imovel.codigo}</p>

                <h2>{imovel.titulo}</h2>

                <strong>
                    R$ {imovel.preco.toLocaleString('pt-BR')}
                </strong>

                <p>
                    {imovel.quartos} quartos · {imovel.banheiros} banheiros
                </p>

                <Link
                    className="button"
                    to={'/imoveis/' + imovel.codigo}
                >
                    Ver detalhes
                </Link>
            </div>
        </article>
    );
}