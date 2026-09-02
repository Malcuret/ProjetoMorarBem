import { Link } from 'react-router-dom';
export default function Navbar() { return <header className='navbar'><Link className='brand' to='/'>Morar Bem</Link><nav><Link to='/'>Início</Link><Link to='/imoveis'>Imóveis</Link></nav></header>; }
