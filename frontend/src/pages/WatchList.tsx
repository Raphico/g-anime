import { useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import Greeting from "../components/Greeting";
import LoggedHeader from "../components/LoggedHeader";
import Spinner from "../components/Spinner";
import { getWatchList, reset } from "../features/watchList/watchListReducer";
import Api from "../apiType";
import { useState } from "react";
import WatchListAnime from "../components/WatchListAnime";

export default function WatchList()
{
  const dispatch = useAppDispatch();
  const { watchList, isLoading, isError, message } = useAppSelector((state) => state.watchList);
  const [anime, setAnime] = useState<Api[]>();

  useMemo(async() => {
    const allAnime: Api[] = []
    for (let i = 0; i < watchList.length; i++)
    {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${watchList[i].anime}`);
      const JSONdata = await res.json();

      allAnime.push(JSONdata.data);
    }
    setAnime(allAnime);
  }, [watchList]);


  useEffect(() => {
    if (isError)
    {
      console.log(message)
    }

    dispatch(getWatchList());

    return (() => {
      dispatch(reset());
    })
  }, [dispatch, isError, message]);

  if (isLoading)
  {
    return <Spinner />
  }

  return (
    <>
      <LoggedHeader />
      <Greeting />
      <div className="container">
        {watchList.length === 0 ? <h2 className='text-center'>No Anime in your watchList</h2> : (
          <div className="anime-container">
            {anime?.map(a => <WatchListAnime key={String(a.mal_id)} anime={a} />)}
          </div>
        )}
      </div>
    </>
  )
}