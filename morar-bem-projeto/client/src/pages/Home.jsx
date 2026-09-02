import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className='hero'>
      <p>Imobiliária Morar Bem</p>
      <h1>Encontre o lugar ideal para morar.</h1>
      <p>Casas e apartamentos selecionados para a sua próxima conquista.</p>
      <Link className='button' to='/imoveis'>Ver imóveis disponíveis</Link>
    </section>
  );
}
