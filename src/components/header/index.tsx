import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiUser, FiLogIn, FiLoader } from 'react-icons/fi';

export function Header() {
  const signed = false; // Exemplo, deve ser gerenciado por estado real
  const loadingAuth = false; // Exemplo, deve ser gerenciado por estado real

  return (
    <div className='w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4'>
      <header className='flex items-center max-w-7xl justify-between w-full px-4 mx-auto '>
        <Link to="/">
          <img src={logo} alt="logo do site" className='h-8' />
        </Link>

        <div className='flex items-center space-x-4'>
          {!loadingAuth && signed && (
            <Link to='/dashboard'>
              <div className='border-2 rounded-full p-1'>
                <FiUser size={24} color="#000" />
              </div>
            </Link>
          )}

          {!loadingAuth && !signed && (
            <Link to='/dashboard'>
              <FiLogIn size={24} color="#000" />
            </Link>
          )}

          {loadingAuth && (
            <div className='flex items-center'>
              <FiLoader className='animate-spin' size={24} color="#000" />
              <span className='ml-2'>Carregando...</span>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}