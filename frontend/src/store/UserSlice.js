import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
     SetUserdetails :(state,action)=>{
      state.user = action.payload;
            console.log("UserDetails ",action.payload)
     }
  },
})

// Action creators are generated for each case reducer function
export const { SetUserdetails} = userSlice.actions

export default userSlice.reducer