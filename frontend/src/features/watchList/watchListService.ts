const API_URL = 'http://localhost:5000/api/watchList'

const getWatchList = async(token: String | undefined) =>
{
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json();

  if (res.status === 200)
  {
    return data;
  }
  throw new Error(data.msg || data);
}

const addToWatchList = async(anime: Number, token: String | undefined) =>
{
  const bodyData = {
    anime
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
    }
  })
  const data = await res.json();

  if (res.status === 201 || res.status === 200)
  {
    return data;
  }

  throw new Error(data.msg);
}

const delWatchList = async(id: String, token: String | undefined) =>
{
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json();

  if (res.status === 200)
  {
    return data;
  }

  throw new Error(data.msg);
}

const watchListService = {
  getWatchList,
  addToWatchList,
  delWatchList
}

export default watchListService;