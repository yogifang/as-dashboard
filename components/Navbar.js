import Link from 'next/link';

const Navbar = () => (
  <nav className='navbar'>
    <Link href='/'>
      <a className='navbar-brand'>Asia-Scouting Dashboard</a>
    </Link>
    <Link href='/baseball'>
      <a className='create'>棒球</a>
    </Link>
    <Link href='/shooting'>
      <a className='create'>射擊</a>
    </Link>
  </nav>
);

export default Navbar;
