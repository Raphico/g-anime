import React, { useEffect } from "react";
import { BsHeartFill } from 'react-icons/bs';
import Api from '../apiType';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { addToWatchList, reset } from '../features/watchList/watchListReducer';
import Spinner from "./Spinner";
import { changeDisplayInfo, changeInfoId } from '../features/logged/loggedReducer';
import AnimeInfo from "./AnimeInfo";

type Props = {
  anime: Api
}

const Anime: React.FC<Props> = ({ anime }) =>
{
  const dispatch = useAppDispatch();
  const { isLoading, isError, message } = useAppSelector((state) => state.watchList);
  const { displayInfo, infoId } = useAppSelector((state) => state.logged);

  useEffect(() => {
    if (isError)
    {
      console.log(message);
    }
    dispatch(reset());
  }, [isError, message, dispatch]);

  if (isLoading)
  {
    return <Spinner />
  }

  return (
    <>
      <div className={`anime`}>
        <img src={anime.images.jpg.large_image_url} alt="thumbnail" />

        <p className="title">{anime.title.substring(0, 50)}</p>

        <p className="genres">Genres: {anime.genres.map((genre) => genre.name + ' ')}</p>

        <div className="flex">
          <button className="like" onClick={() => dispatch(addToWatchList(anime.mal_id))}>
            <BsHeartFill color="red" size={20} />
          </button>

          <p className="rating">Rating: {anime.score === null ? '?' : String(anime.score)}</p>
        </div>
        <button className="btn" onClick={() => {
        dispatch(changeInfoId(anime.mal_id))
        dispatch(changeDisplayInfo(!displayInfo))
        }}>More...</button>
      </div>
      {displayInfo && <AnimeInfo id={infoId} />}
    </>
  )
}

export default Anime;
