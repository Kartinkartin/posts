import { createSlice } from "@reduxjs/toolkit";

const postsToolkitSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        favourites: [],
    },
    reducers: {
        addPosts(state, action) {
            state.posts.push(...action.payload)
        },
        deletePost(state, action) {
            const id = action.payload;
            const post = state.posts.find(post => post.id === id);
            const index = state.posts.indexOf(post);
            state.posts.splice(index, 1);
        },
        mode(state) {},
        addToFav(state, action) {
            const id = action.payload;
            const favourites = state.favourites;
            if(favourites.includes(id)) {
                const index = favourites.indexOf(id);
                state.favourites.splice(index, 1);
            } else {
                state.favourites.push(action.payload);
                state.favourites.sort();
            }
        },
    }
})

export default postsToolkitSlice.reducer;
export const { addPosts, deletePost, mode, addToFav } = postsToolkitSlice.actions;
