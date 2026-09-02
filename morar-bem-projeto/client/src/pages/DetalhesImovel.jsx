import { useParams } from "react-router-dom";

export function DetalhesImovel() {
    const { id } = useParams();

    return (
        <div>
            <h1>Detalhes do Imóvel</h1>
            <p>Informações detalhadas sobre o imóvel com ID: {id}</p>
        </div>
    )
};

export default DetalhesImovel;