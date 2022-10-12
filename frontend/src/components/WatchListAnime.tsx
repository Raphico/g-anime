import React from "react";
import { FaTrashAlt } from 'react-icons/fa';
import Api from '../apiType';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { delWatchList } from '../features/watchList/watchListReducer';
import { changeDisplayInfo, changeInfoId } from '../features/logged/loggedReducer';
import AnimeInfo from "./AnimeInfo";

type Props = {
  anime: Api
}

const WatchListAnime: React.FC<Props> = ({ anime }) =>
{
  const dispatch = useAppDispatch();
  const { displayInfo, infoId } = useAppSelector((state) => state.logged);
  const { watchList } = useAppSelector((state) => state.watchList);

  const index = watchList.findIndex(a => Number(a.anime) === anime.mal_id);

  return (
    <>
      <div className="anime">
        <img src={anime.images.jpg.large_image_url} alt="thumbnail" />

        <p className="title">{anime.title.substring(0, 50)}</p>

        <p className="genres">Genres: {anime.genres.map((genre) => genre.name + ' ')}</p>

        <div className="flex">
          <FaTrashAlt onClick={() => dispatch(delWatchList(watchList[index]._id))} color="red" size={20} />

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

export default WatchListAnime;
