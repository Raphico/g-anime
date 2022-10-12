import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from "../components/Spinner";
import Api from "../apiType";
import { FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from "../app/hook";
import { changeDisplayInfo } from '../features/logged/loggedReducer';

type Props = {
  id: Number
}

const AnimeInfo: React.FC<Props> = ({ id }) =>
{
  const [anime, setAnime] = useState<Api>();
  const dispatch = useAppDispatch();
  const { displayInfo } = useAppSelector((state) => state.logged);

  const getAnimeInfoFromApi = async() =>
  {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const jsonData = await res.json();

    return jsonData.data;
  }

  const { data, error, isLoading, isSuccess } = useQuery(['anime'], getAnimeInfoFromApi);

  useEffect(() => {
    if (isSuccess)
    {
      setAnime(data)
    }

    if (error instanceof Error)
    {
      console.log(error);
    }
    
  }, [data, isLoading, error, isLoading, isSuccess]);

  if (isLoading)
  {
    return <Spinner />
  }

  return (
    <div className="anime-info">
      <div className="content">
        <FaTimes size={25} className="close" onClick={() => dispatch(changeDisplayInfo(!displayInfo))} />
        <div>
          <img src={anime?.images.jpg.large_image_url} alt="thumbnail" />

          <p><span className="title">Anime:</span> {anime?.title}</p>

          <div className="flex">
            <p><span className="title"> Genres:</span> {anime?.genres.map((genre) => genre.name + ' ')}</p>

            <p><span className="title">Rating: </span> {anime?.score === null ? '?' : String(anime?.score)}</p>
          </div>    

          <p className='synopsis'><span className="title">Plot Summary:</span> {anime?.synopsis}</p>
        </div>
      </div>
    </div>
  )
}

export default AnimeInfo;
