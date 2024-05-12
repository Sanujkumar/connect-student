import { createSlice } from "@reduxjs/toolkit";

const initialState={
    postList:[]
}


const postData=createSlice({
    name:"post",
    initialState:initialState,
    reducers:{
        setPostdata(state, action) {
            state.postList.unshift(action.payload)
        }
    }


})

export const { setPostdata } = postData.actions;
export default postData.reducer;