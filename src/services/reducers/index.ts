import { combineReducers } from "@reduxjs/toolkit";
import postsToolkitSlice from './posts';
import usersToolkitSlice from './users';

const rootReducer = combineReducers({
    posts: postsToolkitSlice,
    users: usersToolkitSlice,
})

export default rootReducer;
