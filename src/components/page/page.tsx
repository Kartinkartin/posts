import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUsers } from "../api/api";
import styles from "./page.module.css";
import Post from "../post/post";
import { addPosts } from "../../services/reducers/posts";
import { TStore } from "../../services/types";
import { addUsers } from "../../services/reducers/users";
import Button from "../../ui/buttons/button";
import Modal from "../../ui/modal/modal";
import PopupDelete from "../popup-delete/popup-delete";
import useModal from "../../hooks/use-modal";
import PopupAddFafourite from "../popup-add-favourite/popup-add-favourite";

export default function Page() {
  const dispatch = useDispatch();
  const users = useSelector((state: TStore) => state.users);
  const { posts, chosen, favourites } = useSelector(
    (state: TStore) => state.posts
  );
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    isModalOpen: isAddingFavourite,
    openModal: addFavor,
    closeModal: closeFavor,
  } = useModal();

  useEffect(() => {
    getUsers().then((users) => {
      dispatch(addUsers(users));
    });
    getPosts().then((posts) => {
      dispatch(addPosts(posts));
    });
  }, []);
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>POSTS</h1>
      </header>
      <main className={styles.container}>
        {users.length !== null &&
          posts.length !== null &&
          posts.map(({ title, body, userId, id }) => (
            <Post
              title={title}
              text={body}
              author={users.find((user) => user.id === userId)!.name}
              id={id}
              key={id}
              onDelete={openModal}
            />
          ))}
        {/* case of error or loading */}
        {Array.isArray(chosen) && chosen.length && (
          <div className={styles.handlers}>
            <Button
              text="Удалить"
              type="button"
              size="large"
              onClick={openModal}
            />
            <Button
              text="В избранное"
              type="button"
              size="large"
              onClick={addFavor}
            />
          </div>
        )}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <PopupDelete closeModal={closeModal} id={chosen} />
          </Modal>
        )}
        {isAddingFavourite && Array.isArray(chosen) && (
          <Modal onClose={closeFavor}>
            <PopupAddFafourite closeModal={closeFavor} id={chosen} />
          </Modal>
        )}
      </main>
    </>
  );
}
