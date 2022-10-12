import React from "react";
import Api from "../apiType";
import Anime from "./Anime";

type Props = {
  animeList: Api[] | undefined
}

const AnimeContainer: React.FC<Props> = ({ animeList }) => 
{
  return (
    <div className="anime-container">
      {animeList?.map((anime) => <Anime key={String(anime.mal_id)} anime={anime} />)}
    </div>
  )
}

export default AnimeContainer;
