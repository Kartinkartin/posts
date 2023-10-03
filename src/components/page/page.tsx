import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUsers } from "../api/api";
import styles from "./page.module.css";
import Post from "../post/post";
import { addPosts } from "../../services/reducers/posts";
import { TStore } from "../../services/types";
import { addUsers } from "../../services/reducers/users";

export default function Page() {
  const dispatch = useDispatch();
  const users = useSelector((state: TStore) => state.users);
  const { posts, favourites } = useSelector((state: TStore) => state.posts);

  useEffect(() => {
    getUsers().then((users) => {
        dispatch(addUsers(users));

    });
    getPosts().then((posts) => {
        dispatch(addPosts(posts));
    });
  }, []);
  return (
    <div className={styles.container}>
      {users.length !== null &&
        posts.length !== null &&
        posts.map(({ title, body, userId, id }) => (
          <Post
            title={title}
            text={body}
            author={users.find((user) => user.id === userId)!.name}
            id={id}
            key={id}
            inFavourite={favourites?.includes(id)}
          />
        ))}
        {/* case of error or loading */}
      <div>text</div> 
    </div>
  );
}
