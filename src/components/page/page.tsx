import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUsers } from "../api/api";
import { IPost, IUser } from "../services/types/data";
import styles from "./page.module.css";
import Post from "../post/post";
import { addPost } from "../../services/reducers/posts";
import { TStore } from "../services/types";
import { addUser } from "../../services/reducers/users";

export default function Page() {
  const dispatch = useDispatch();
  const users = useSelector((state: TStore) => state.users);
  const posts = useSelector((state: TStore) => state.posts.posts);

  useEffect(() => {
    getUsers().then((users) => {
        users.forEach((user: IUser) => dispatch(addUser(user)));

    });
    getPosts().then((posts) => {
        posts.forEach((post: IPost) => dispatch(addPost(post)));
    });
  }, []);
  return (
    <div className={styles.container}>
      {users !== null &&
        posts !== null &&
        posts.map(({ title, body, userId, id }) => (
          <Post
            title={title}
            text={body}
            author={users.find((user) => user.id === userId)!.name}
            id={id}
            key={id}
          />
        ))}
        {/* case of error */}
      <div>text</div> 
    </div>
  );
}
