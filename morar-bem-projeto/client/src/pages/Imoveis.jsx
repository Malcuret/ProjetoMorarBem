import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ImovelCard from '../components/ImovelCard';
export default function Imoveis() { const [dados, setDados] = useState(null); const [erro, setErro] = useState(''); useEffect(() => { api.get('/imoveis').then((r) => setDados(r.data)).catch(() => setErro('Não foi possível carregar os imóveis.')); }, []); if (erro) return <p>{erro}</p>; if (!dados) return <p>Carregando imóveis...</p>; if (!dados.length) return <p>Nenhum imóvel disponível.</p>; return <section><h1>Imóveis disponíveis</h1><div className='property-grid'>{dados.map((imovel) => <ImovelCard key={imovel.codigo} imovel={imovel}/>)}</div></section>; }
