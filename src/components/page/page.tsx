import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../../hooks/use-modal";
import { useForm } from "../../hooks/use-form";
import { getPosts, getUsers } from "../api/api";
import { addPosts } from "../../services/reducers/posts";
import { addUsers } from "../../services/reducers/users";
import Post from "../post/post";
import Button from "../../ui/buttons/button";
import Modal from "../../ui/modal/modal";
import PopupDelete from "../popup-delete/popup-delete";
import PopupAddFafourite from "../popup-add-favourite/popup-add-favourite";
import starEmptyIcon from "../../images/star_border.svg";
import starFullIcon from "../../images/star.svg";
import arrowIcon from "../../images/arrow_drop_24px.svg";
import { TStore } from "../../services/types";
import { IPost, IUser } from "../../services/types/data";
import styles from "./page.module.css";
import FilterUser from "../filter-user/filter-user";

export default function Page() {
  const dispatch = useDispatch();
  const users = useSelector((state: TStore) => state.users);
  const { posts, chosen, favourites } = useSelector(
    (state: TStore) => state.posts
  );
  // контроль параметров фильтров и сотрировки
  const { values, handleChange, setValues } = useForm({
    title: "",
    author: "Все",
    userId: "",
    sort: "--",
  });
  // фильтры
  const [filterStar, setFilterStar] = useState(false);
  const [filterTitle, setFilterTitle] = useState(false);
  const [openFilterName, setOpenFilterName] = useState(false);
  const [filterName, setFilterName] = useState(false);
  // сортировка
  const [openSort, setOpenSort] = useState(false);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [sortSide, setSortSide] = useState<"upToDown" | "downToUp" | null>(
    null
  );
  //для модалок подтверждения удаления и добавления/изъятия избранного
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
  };
  const onFilterName = (e: any) => {
    setOpenFilterName(false);
    const name = e.target.textContent;
    if (name !== "Все") {
      const user = users.filter((user) => user.name === name)[0];
      setValues({ ...values, author: name, userId: user.id.toString() });
      setFilterName(true);
    } else {
      setValues({ ...values, author: "Все", userId: "" });
      setFilterName(false);
    }
  };
  const onSort = (e: any) => {
    setOpenSort(false);
    const option = e.target.textContent;
    if (option === "--") {
      setSortOption(null);
      setSortSide(null);
    } else {
      setSortOption(option);
      setSortSide("downToUp");
    }
    setValues({ ...values, sort: option });
  };
  function compareString(
    arr: any,
    key: string,
    condition: "upToDown" | "downToUp"
  ) {
    return arr.sort((a: any, b: any) => {
      if (a[key] > b[key]) {
        return condition === "upToDown" ? -1 : 1;
      } else if (a[key] < b[key]) {
        return condition === "upToDown" ? 1 : -1;
      } else return 0;
    });
  }
  const postsRender = () => {
    const postsFiltered = posts.filter((post) => {
      return (
        (filterStar ? favourites.includes(post.id) : 1) &&
        (filterTitle ? post.title.includes(values.title) : 1) &&
        (filterName ? post.userId === +values.userId : 1)
      );
    });
    let postSorted: Array<IPost> = [];
    if (sortOption === "ID") {
      postSorted = [...postsFiltered].sort((a, b) =>
        sortSide === "upToDown" ? b.id - a.id : a.id - b.id
      );
    } else if (sortOption === "названию") {
      postSorted = compareString(postsFiltered, "title", sortSide!);
    } else if (sortOption === "имени автора") {
      const usersSort = compareString([...users], "name", sortSide!);
      usersSort.forEach((user: IUser) => {
        postSorted = [...postSorted].concat(
          [...postsFiltered].filter((post) => post.userId === user.id)
        );
      });
    } else if (sortOption === "наличию в избранном") {
      sortSide === "downToUp"
        ? (postSorted = [...postSorted].concat(
            postsFiltered.filter((post) => favourites.includes(post.id)),
            postsFiltered.filter((post) => !favourites.includes(post.id))
          ))
        : (postSorted = [...postSorted].concat(
            postsFiltered.filter((post) => !favourites.includes(post.id)),
            postsFiltered.filter((post) => favourites.includes(post.id))
          ));
    } else {
      postSorted = postsFiltered;
    }

    return postSorted.map(({ title, body, userId, id }) => (
      <Post
        title={title}
        text={body}
        author={users.find((user) => user.id === userId)!.name}
        id={id}
        key={`post${id}`}
        onDelete={openModal}
      />
    ));
  };
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
        <div className={styles.filters}>
          <button
            className={styles.filter_star}
            style={
              filterStar
                ? { backgroundImage: `url(${starFullIcon})` }
                : { backgroundImage: `url(${starEmptyIcon})` }
            }
            type="button"
            onClick={() => setFilterStar(!filterStar)}
          />
          <div className={styles.filters_container}>
            <form className={styles.filter_title} onSubmit={onSubmit}>
              <input
                className={styles.filter_title}
                type="text"
                placeholder="Поиск по заголовку"
                onChange={handleChange}
                value={values.title}
                name="title"
              />
            </form>
            <FilterUser
              author={values.author}
              onClick={onFilterName}
            />
          </div>
        </div>
        <div className={styles.sorting}>
          <p className={styles.sorting__text}>Сортировать по: </p>
          <div className={styles.sorting__container}>
            <div className={styles.sort_options}>
              <div
                className={styles.filter_arrow}
                style={{ backgroundImage: `url(${arrowIcon})` }}
                onClick={() => {
                  setOpenSort(!openSort);
                }}
              />
              <p className={styles.sorting__text}>{values.sort}</p>

              {openSort && (
                <div className={styles.filter_name__list}>
                  <button
                    type="button"
                    className={styles.filter_name__listText}
                    onClick={onSort}
                  >
                    --
                  </button>
                  <button
                    type="button"
                    className={styles.filter_name__listText}
                    onClick={onSort}
                  >
                    ID
                  </button>
                  <button
                    type="button"
                    className={styles.filter_name__listText}
                    onClick={onSort}
                  >
                    названию
                  </button>
                  <button
                    type="button"
                    className={styles.filter_name__listText}
                    onClick={onSort}
                  >
                    имени автора
                  </button>
                  <button
                    type="button"
                    className={styles.filter_name__listText}
                    onClick={onSort}
                  >
                    наличию в избранном
                  </button>
                </div>
              )}
            </div>
            {sortSide && (
              <div className={styles.sort_buttons}>
                <button
                  className={styles.sort_buttons__button}
                  type="button"
                  onClick={() => setSortSide("upToDown")}
                />
                <button
                  className={`${styles.sort_buttons__button} ${styles.sort_buttons__button_flip}`}
                  type="button"
                  onClick={() => setSortSide("downToUp")}
                />
              </div>
            )}
          </div>
        </div>
      </header>
      <main className={styles.container}>
        {users.length !== null && posts.length !== null && postsRender()}
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
