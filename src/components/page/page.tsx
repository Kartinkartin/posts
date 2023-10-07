import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../../hooks/use-modal";
import { getPosts, getUsers } from "../api/api";
import { addPosts } from "../../services/reducers/posts";
import { addUsers } from "../../services/reducers/users";
import { TStore } from "../../services/types";
import Post from "../post/post";
import Button from "../../ui/buttons/button";
import Modal from "../../ui/modal/modal";
import PopupDelete from "../popup-delete/popup-delete";
import PopupAddFafourite from "../popup-add-favourite/popup-add-favourite";
import starEmptyIcon from "../../images/star_border.svg";
import starFullIcon from "../../images/star.svg";
import styles from "./page.module.css";
import { useForm } from "../../hooks/use-form";

export default function Page() {
  const dispatch = useDispatch();
  const users = useSelector((state: TStore) => state.users);
  const { posts, chosen, favourites } = useSelector(
    (state: TStore) => state.posts
  );
  // фильтры
  const [filterStar, setFilterStar] = useState(false);
  const { values, handleChange } = useForm({title: ''});
  const [filterTitle, setFilterTitle] = useState(false);
  //для подтверждения удаления и добавления/изъятия избранного
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    isModalOpen: isAddingFavourite,
    openModal: addFavor,
    closeModal: closeFavor,
  } = useModal();

  const onSubmit = (e: any) => {
    e.preventDefault();
    const { title } = values;
    title ? setFilterTitle(true) : setFilterTitle(false);
  }

  const allPostsRender = () => {
    return(
      posts.map(({ title, body, userId, id }) => (
        <Post
          title={title}
          text={body}
          author={users.find((user) => user.id === userId)!.name}
          id={id}
          key={`post${id}`}
          onDelete={openModal}
        />
      ))
    )
  }
  const filterPostRender = () => {
    const postsFiltered = posts.filter(post => {
      return (
        filterStar ? favourites.includes(post.id) : 1
      ) && (
        filterTitle ? post.title.includes(values.title) : 1
      )
    })
    return postsFiltered.map(({ title, body, userId, id }) => (
      <Post
        title={title}
        text={body}
        author={users.find((user) => user.id === userId)!.name}
        id={id}
        key={`post${id}`}
        onDelete={openModal}
      />
    ))
  }
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
        <div className={styles.filters} >
          <button
            className={styles.filterStar}
            style={
              filterStar
                ? { backgroundImage: `url(${starFullIcon})` }
                : { backgroundImage: `url(${starEmptyIcon})` }
            }
            onClick={() => setFilterStar(!filterStar)}
          />
          <form className={styles.filterTitle} onSubmit={onSubmit}>
            <input 
              type='text'
              placeholder="Поиск по заголовку"
              onChange={handleChange}
              value={values.title}
              name='title'
            />
          </form>
          <div className={styles.filterName}>
          <p className={styles.filter__text}>все</p>

          </div>
        </div>
      </header>
      <main className={styles.container}>
        {users.length !== null &&
          posts.length !== null && (
          // filterStar ?
          filterPostRender() 
          //: allPostsRender()
        )}
        {/* case of error or loading */}
        {Array.isArray(chosen) && Boolean(chosen.length) && (
          <div className={styles.handlers}>
            <Button
              text="Удалить"
              type="button"
              size="large"
              onClick={openModal}
            />
            <Button
              text="Избранное"
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
