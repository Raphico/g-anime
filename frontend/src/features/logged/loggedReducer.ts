import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  display: boolean,
  searched: String,
  displayInfo: boolean,
  infoId: Number
}

const initialState: State = {
  display: false,
  searched: '',
  displayInfo: false,
  infoId: 0
}

const loggedSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
    changeDisplay: (state, action: PayloadAction<boolean>) => {
      state.display = action.payload;
    },
    changeSearched: (state, action: PayloadAction<String>) => {
      state.searched = action.payload;
    },
    changeDisplayInfo: (state, action: PayloadAction<boolean>) => {
      state.displayInfo = action.payload;
    },
    changeInfoId: (state, action: PayloadAction<Number>) => {
      state.infoId = action.payload;
    }
  }
})

export const { changeDisplay, changeSearched, changeDisplayInfo, changeInfoId } = loggedSlice.actions;
export default loggedSlice.reducer;
