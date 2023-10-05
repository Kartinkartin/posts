import { createSlice } from "@reduxjs/toolkit";

const postsToolkitSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    favourites: [],
    chosen: [],
  },
  reducers: {
    addPosts(state, action) {
      state.posts.push(...action.payload);
    },
    deletePost(state, action) {
      const id = action.payload;
      const post = state.posts.find((post) => post.id === id);
      const index = state.posts.indexOf(post);
      state.posts.splice(index, 1);
      state.chosen = [];
    },
    changePost(state, action) {
      const { id, userId, title, body } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      const index = state.posts.indexOf(post);
      state.posts[index] = { id, userId, title, body };
    },
    addToFav(state, action) {
      const id = action.payload;
      const favourites = state.favourites;
      if (favourites.includes(id)) {
        const index = favourites.indexOf(id);
        state.favourites.splice(index, 1);
      } else {
        state.favourites.push(action.payload);
        state.favourites.sort();
      }
    },
    choseManyPosts(state, action) {
      const id = action.payload;
      const chosen = state.chosen;
      if (chosen.includes(id)) {
        const index = chosen.indexOf(id);
        state.chosen.splice(index, 1);
      } else {
        state.chosen.push(action.payload);
        state.chosen.sort();
      }
    },
  },
});

export default postsToolkitSlice.reducer;
export const {
  addPosts,
  deletePost,
  changePost,
  addToFav,
  choseManyPosts,
} = postsToolkitSlice.actions;
