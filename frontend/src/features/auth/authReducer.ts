import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user') || '{}');

type State = {
  user: {
    _id: String,
    name: String,
    token: String 
  } | null,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  message: String
}

const initialState: State = {
  user: Object.entries(user).length === 0 ? null : user,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
}

export const register = createAsyncThunk('auth/register', async (userData: Object, thunkAPI) => {
  try 
  {
    return await authService.registerUser(userData);
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

export const logoutUser = createAsyncThunk('auth/logout', async() => {
  await authService.logoutUser();
})

export const loginUser = createAsyncThunk('auth/login', async(userData: Object, thunkAPI) => {
  try
  {
    return await authService.loginUser(userData);
  }
  catch (error)
  {
    if (error instanceof Error)
    {
      const message = error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const loginViaSecurityQuestion = createAsyncThunk('auth/login-security-question', async(userData: Object, thunkAPI) => {
  try
  {
    return await authService.loginViaSecurityQuestion(userData);
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => 
    {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as String;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isSuccess = true;
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload as String;
      })
      .addCase(loginViaSecurityQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginViaSecurityQuestion.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isSuccess = true;
        state.user = action.payload
      })
      .addCase(loginViaSecurityQuestion.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload as String;
      })
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
