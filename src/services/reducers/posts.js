import { createSlice } from "@reduxjs/toolkit";

const postsToolkitSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
    },
    reducers: {
        addPost(state, action) {
            state.posts.push(action.payload)
        },
        deletePost(state) {
            console.log("this.delete")
        },
        mode(state) {},
        addToFav(state) {},
    }

})

export default postsToolkitSlice.reducer;
export const { addPost, deletePost, mode, addToFav } = postsToolkitSlice.actions;
