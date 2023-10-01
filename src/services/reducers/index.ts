import { combineReducers } from "@reduxjs/toolkit";
import postsToolkitSlice from './posts';
import usersToolkitSlice from './users';
import commentsToolkitSlice from "./comments";

const rootReducer = combineReducers({
    posts: postsToolkitSlice,
    users: usersToolkitSlice,
    comments: commentsToolkitSlice,
})

export default rootReducer;
