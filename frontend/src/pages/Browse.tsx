import LoggedHeader from '../components/LoggedHeader';
import { useAppSelector } from '../app/hook';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import Api from '../apiType';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { QueryFunctionContext } from '@tanstack/react-query';
import { useQuery } from 'react-query';
import AnimeContainer from '../components/AnimeContainer';
import Greeting from '../components/Greeting';

export default function Browse()
{
  enum Page { Max = 50, Min = 0, Step = 1 };

  const { searched } = useAppSelector((state) => state.logged);
  const [page, setPage] = useState(Page.Min);
  const [animeList, setAnimeList] = useState<Array<Api>>();

  const getAnimeFromApi = async({ queryKey }: QueryFunctionContext) =>
  {
    const res = await fetch(`https://api.jikan.moe/v4/anime?${!searched ? `genres=${queryKey[1]}&limit=25`: `q=${queryKey[2]}`}`);
    const jsonData = await res.json();

    return jsonData.data;
  }

  const { data, error, isLoading, isSuccess } = useQuery(['anime', page, searched], (context) => getAnimeFromApi(context));

  useEffect(() => {
    if (isSuccess)
    {
      setAnimeList(data)
    }

    if (error instanceof Error)
    {
      console.log(error);
    }

  }, [data, isLoading, error, isLoading, isSuccess])

  if (isLoading)
  {
    return <Spinner />
  }

  return (
    <>
      <LoggedHeader />
      <Greeting />
      <div className="container">
        {animeList?.length !== 0 ? <AnimeContainer animeList={animeList} /> : <h2 className='text-center my'>Couldn't find anime</h2>}

        <div className="flex page">
          <FcPrevious size={30} onClick={() => setPage((prev) => prev - Page.Step < Page.Min ? prev : prev - Page.Step)} />
          
          <FcNext size={30} onClick={() => setPage((prev) => prev + Page.Step > Page.Max ? prev : prev + Page.Step)} />
        </div>
      </div>
    </>
  )
}
