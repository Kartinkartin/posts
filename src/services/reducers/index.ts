import { combineReducers } from "@reduxjs/toolkit";
import postsToolkitSlice from './posts';
import usersToolkitSlice from './users';
import commentsToolkitSlice from "./comments";
import errorToolkitSlice from './error';

const rootReducer = combineReducers({
    posts: postsToolkitSlice,
    users: usersToolkitSlice,
    comments: commentsToolkitSlice,
    error: errorToolkitSlice,
})

export default rootReducer;
