import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import watchListService from './watchListService';

type Anime = {
  _id: String,
  anime: Number
}

type State = {
  watchList: Anime[],
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  message: String
}

const initialState: State = {
  watchList: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
}

export const getWatchList = createAsyncThunk('watchList/get', async (_, thunkAPI) => {
  try 
  {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user?.token;

    return await watchListService.getWatchList(token);
  }
  catch (error) 
  {
    if (error instanceof Error)
    {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const addToWatchList = createAsyncThunk('watchList/add', async(anime: Number, thunkAPI) => {
  try
  {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user?.token;

    return await watchListService.addToWatchList(anime, token);
  } 
  catch (error) 
  {
    if (error instanceof Error)
    {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
})

export const delWatchList = createAsyncThunk('watchList/del', async(id: String, thunkAPI) => {
  try 
  {
    const globalState = thunkAPI.getState() as RootState;
    const token = globalState.auth.user?.token;

    return await watchListService.delWatchList(id, token);
  } 
  catch (error) 
  {
    if (error instanceof Error)
    {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
})

const watchListSlice = createSlice({
  name: 'watchList',
  initialState,
  reducers: {
    reset: (state) => {
      state.watchList = []
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message ='';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWatchList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWatchList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.watchList = action.payload
      })
      .addCase(getWatchList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as String
      })
      .addCase(addToWatchList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWatchList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.watchList.push(action.payload?.data);
      })
      .addCase(addToWatchList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as String;
      })
      .addCase(delWatchList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delWatchList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.watchList = state.watchList.filter(anime => anime.anime !== action.payload.anime);
      })
      .addCase(delWatchList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as String;
      })
  }
});

export const { reset } = watchListSlice.actions;
export default watchListSlice.reducer;
