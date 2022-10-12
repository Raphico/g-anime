type Api = {
  aired: Object,
  airing: boolean,
  approved: boolean,
  background: null,
  broadcast: Object,
  demographics: Array<String>,
  duration: String,
  episodes: Number,
  explicit_genres: Array<String>,
  favorites: Number,
  genres: [
    {
      mal_id: Number,
      name: String,
      type: String
    }
  ],
  images: {
    jpg: {
      image_url: string,
      large_image_url: string,
      small_image_url: string
    },
    webp: {
      image_url: string,
      large_image_url: string,
      small_image_url: string
    }
  },
  licensors: Array<Object>,
  mal_id: Number,
  members: Number,
  popularity: Number,
  producers: Array<Object>,
  rank: Number,
  rating: String,
  score: Number,
  scored_by: Number,
  season: String,
  source: String,
  status: String,
  studios: Array<Object>,
  synopsis: String,
  themes: Array<Object>,
  title: String,
  title_english: String,
  title_japanese: String,
  title_synonyms: Array<String>,
  titles: Array<Object>,
  trailer: Object,
  type: String,
  url: String,
  year: Number,
}

export default Api;
