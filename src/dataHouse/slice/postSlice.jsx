import { createSlice } from "@reduxjs/toolkit";

const initialState={
    postList:[],
    commentList:[]
}


const postData=createSlice({
    name:"post",
    initialState:initialState,
    reducers:{
        setPostdata(state, action) {
            state.postList.unshift(action.payload)
        },
        setComment(state,action){
            state.commentList.unshift(action.payload)
        }
    }


})

export const { setPostdata,setComment } = postData.actions;
export default postData.reducer;