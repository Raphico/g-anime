import { useAppDispatch, useAppSelector } from '../app/hook';
import { changeSearched, changeDisplay } from '../features/logged/loggedReducer';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';

export default function Search()
{
  const dispatch = useAppDispatch();
  const { display } = useAppSelector((state) => state.logged)
  const [searched, setSearched] = useState('');

  const onSubmit = () =>
  {
    if (searched)
    {
      dispatch(changeSearched(searched));
      setSearched('');
      dispatch(changeDisplay(!display));
    }
    else
    {
      toast.error('Pls pass in an anime')
    }
  }

  return (
    <section className={`search`}>
      <form>
        <input className='dark' type="text" placeholder='Anime?' value={searched} onChange={(e) => setSearched(e.target.value)} />
        <BsSearch className='loggedIcon dark' onClick={onSubmit} />
      </form>
    </section>
  )
}

