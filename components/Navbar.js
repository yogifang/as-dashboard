import Link from 'next/link';

const Navbar = () => (
  <nav className='navbar'>
    <Link href='/'>
      <a className='navbar-brand'>Asia-Scouting Dashboard</a>
    </Link>
    <Link href='/baseball'>
      <a className='create'>Baseball</a>
    </Link>
    <Link href='/shooting'>
      <a className='create'>Shooting</a>
    </Link>
    <Link href='/shootingSheet'>
      <a className='create'>Shooting List</a>
    </Link>
   
  </nav>
);

export default Navbar;
