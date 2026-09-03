import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import ImovelCard from '../components/ImovelCard';

export default function Imoveis() {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('Todos');

  async function carregarImoveis(exibirCarregamento = false) {
    if (exibirCarregamento) { setCarregando(true); setErro(''); }
    try { setDados((await api.get('/imoveis')).data); }
    catch { setErro('Não foi possível carregar os imóveis. Verifique se a API está em execução e tente novamente.'); }
    finally { setCarregando(false); }
  }

  useEffect(() => { carregarImoveis(); }, []);
  const tipos = useMemo(() => ['Todos', ...new Set(dados.map((imovel) => imovel.tipo))], [dados]);
  const filtrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase('pt-BR');
    return dados.filter((imovel) => {
      const texto = [imovel.titulo, imovel.localizacao, imovel.codigo, imovel.tipo].join(' ').toLocaleLowerCase('pt-BR');
      return (tipo === 'Todos' || imovel.tipo === tipo) && (!termo || texto.includes(termo));
    });
  }, [busca, dados, tipo]);

  if (carregando) return <p className='page-status' role='status'>Carregando imóveis...</p>;
  if (erro) return <section className='feedback-section'><h1>Não foi possível carregar os imóveis</h1><p>{erro}</p><button className='button' type='button' onClick={() => carregarImoveis(true)}>Tentar novamente</button></section>;

  return <section>
    <div className='page-heading'><div><p className='eyebrow'>Encontre seu novo lar</p><h1>Imóveis disponíveis</h1></div><p>{filtrados.length} imóvel(is) encontrado(s)</p></div>
    <div className='filters' aria-label='Filtros de imóveis'>
      <label>Buscar por nome, código ou local<input value={busca} onChange={(evento) => setBusca(evento.target.value)} placeholder='Ex.: casa, Moema ou MB-001' /></label>
      <label>Tipo<select value={tipo} onChange={(evento) => setTipo(evento.target.value)}>{tipos.map((opcao) => <option key={opcao}>{opcao}</option>)}</select></label>
    </div>
    {filtrados.length ? <div className='property-grid'>{filtrados.map((imovel) => <ImovelCard key={imovel.codigo} imovel={imovel} />)}</div> : <p className='empty-state'>Nenhum imóvel corresponde aos filtros informados.</p>}
  </section>;
}