import { BsMoonFill, BsSearch, BsSunFill, BsFillHeartFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { changeDisplay, changeSearched } from '../features/logged/loggedReducer';
import { logoutUser } from '../features/auth/authReducer';
import { useNavigate } from 'react-router-dom';

export default function LoggedHeader()
{
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const { display } = useAppSelector((state) => state.logged);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (!user)
    {
      navigate('/register');
    }

    if (darkTheme)
    {
      document.body.className = 'dark-theme';
    }
    else
    {
      document.body.classList.remove('dark-theme');
    }
  }, [darkTheme, user, navigate]);

  const logout = () =>
  {
    dispatch(logoutUser());
    navigate('/login');
  }

  const goHome = () =>
  {
    dispatch(changeSearched(''));
    navigate('/');
  }

  return (
    <>
      <div className='header'>
        <div className="container flex">
          <button className='logo light' onClick={goHome}>
            <h1>G-anime</h1>
          </button>
          <div className='menu flex'>
            <Link style={{ 'paddingTop': 5, color: 'red' }} className='loggedIcon' to='/watch-list'>
              <BsFillHeartFill size={20} />
            </Link>

            <BsSearch size={20} className='light' onClick={() => dispatch(changeDisplay(!display))} />

            <FiLogOut className='loggedIcon light' size={20} onClick={logout} />
            
            {darkTheme ? <BsMoonFill className='dark' onClick={() => setDarkTheme(!darkTheme)} size={23} /> : <BsSunFill className='light' onClick={() => setDarkTheme(!darkTheme)} size={23} />}
          </div>
        </div>
        {display && <Search />}
      </div>
    </>
  )
}