import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function Header()
{
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (darkTheme)
    {
      document.body.className = 'dark-theme';
    }
    else
    {
      document.body.classList.remove('dark-theme');
    }
  }, [darkTheme])

  return (
    <div className='header'>
      <div className="container flex">
        <Link className='logo light' to='/'>
          <h1>G-anime</h1>
        </Link>
        {darkTheme ? <BsMoonFill className='dark' onClick={() => setDarkTheme(!darkTheme)} size={23} /> : <BsSunFill className='light' onClick={() => setDarkTheme(!darkTheme)} size={23} />}
      </div>
    </div>
  )
}