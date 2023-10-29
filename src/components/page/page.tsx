import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../../hooks/use-modal";
import useForm from "../../hooks/use-form";
import { getPosts, getUsers } from "../api/api";
import { addPosts, chosePost } from "../../services/reducers/posts";
import { addUsers } from "../../services/reducers/users";
import { clearError } from "../../services/reducers/error";
import { amountPosts } from "../../services/data";
import { TStore } from "../../services/types";
import { IPost, IUser } from "../../services/types/data";
import FilterUser from "../filter-user/filter-user";
import FilterStar from "../filter-star/filter-star";
import Post from "../post/post";
import Button from "../../ui/buttons/button";
import Modal from "../../ui/modal/modal";
import PopupDelete from "../popup-delete/popup-delete";
import PopupAddFafourite from "../popup-add-favourite/popup-add-favourite";
import styles from "./page.module.css";
import PopupMode from "../popup-mode/popup-mode";
import Sorting from "../sorting/sorting";
import Navigator from "../navigator/navigator";
import FilterAmount from "../filter-amount/filter-amount";
import EmptyRender from "../empty-posts/empty-posts";
import ErrorInfo from "../error/error";

export default function Page() {
  const dispatch = useDispatch();
  const users = useSelector((state: TStore) => state.users);
  const error = useSelector((state: TStore) => state.error);
  const { posts, chosen, favourites } = useSelector(
    (state: TStore) => state.posts
  );
  // контроль параметров фильтров и сотрировки
  const { values, handleChange, setValues } = useForm({
    title: "",
    author: "Все",
    userId: "",
    sort: "--",
    amount: amountPosts[0].toString(),
  });
  // фильтры
  const [filterStar, setFilterStar] = useState(false);
  const [filterTitle, setFilterTitle] = useState(false);
  const [filterName, setFilterName] = useState(false);
  // сортировка
  const [openSort, setOpenSort] = useState(false);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [sortSide, setSortSide] = useState<"upToDown" | "downToUp" | null>(
    null
  );
  // количество постов на странице, номер страницы
  const [page, setPage] = useState(1);
  //для модалок
  const {
    isModalOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const {
    isModalOpen: isAddOpen,
    openModal: openAddModal,
    closeModal: closeAddModal,
  } = useModal();
  const {
    isModalOpen: isModeOpen,
    openModal: openModeModal,
    closeModal: closeModeModal,
  } = useModal();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title } = values;
    title ? setFilterTitle(true) : setFilterTitle(false);
  };
  const onFilterName = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).textContent;
    if (name !== "Все") {
      const user = users.filter((user) => user.name === name)[0];
      setValues({ ...values, author: name ?? "", userId: user.id.toString() });
      setFilterName(true);
    } else {
      setValues({ ...values, author: "Все", userId: "" });
      setFilterName(false);
    }
  };
  const amountHandler = (e: React.MouseEvent<HTMLElement>) => {
    const amount = (e.target as HTMLElement).textContent ?? "10";
    setValues({ ...values, amount });
    localStorage.setItem('amount', amount);
  };
  const onSort = (e: React.MouseEvent<HTMLElement>) => {
    setOpenSort(false);
    const option = (e.target as HTMLElement).textContent ?? "--";
    if (option === "--") {
      setSortOption(null);
      setSortSide(null);
    } else {
      setSortOption(option);
      setSortSide("downToUp");
    }
    setValues({ ...values, sort: option });
  };
  const onClose = (handler: () => void) => {
    // initial to state.posts.chosen is []
    if (typeof chosen === "number") {
      dispatch(chosePost([]));
    }
    handler();
  };
  const closeErrorModal = () => {
    dispatch(clearError());
  }

  function compareStrings(
    arr: Array<IPost | IUser>,
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
    const postsFiltered = posts.filter((post: IPost) => {
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
      postSorted = compareStrings(
        postsFiltered,
        "title",
        sortSide ?? "downToUp"
      ) as Array<IPost>;
    } else if (sortOption === "имени автора") {
      const usersSort = compareStrings(
        [...users],
        "name",
        sortSide ?? "downToUp"
      ) as Array<IUser>;
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
    const amount = values.amount === "Все" ? posts.length : +values.amount;
    const startIndex = (page - 1) * amount;
    const postsToRender = [...postSorted].splice(startIndex, amount);

    return postsToRender.length !== 0 ? (postsToRender.map(({ title, body, userId, id }) => (
      <Post
        title={title}
        text={body}
        author={users.find((user) => user.id === userId)?.name ?? ""}
        id={id}
        key={`post${id}`}
        onDelete={openDeleteModal}
        onMode={openModeModal}
      />
    ))
    ) : (
      <EmptyRender text="Не найдено, измените условия фильтрации"/>
    )
  };
  useEffect(() => {
    Promise.all([getUsers(), getPosts()]).then(([users, posts]) => {
      dispatch(addUsers(users));
      dispatch(addPosts(posts));
    });
    setValues({...values, 'amount': localStorage.getItem('amount') ?? values.amount});
  }, []);
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>POSTS</h1>
        <button
          className={styles.button_add}
          type="button"
          onClick={openModeModal}
        />
        <div className={styles.filters}>
          <FilterStar filter={filterStar} setFilter={setFilterStar} />
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
            <FilterUser author={values.author} onClick={onFilterName} />
          </div>
        </div>
        <Sorting
          isOpen={openSort}
          setOpen={setOpenSort}
          onSort={onSort}
          sortSide={sortSide}
          setSortSide={setSortSide}
          sortType={values.sort}
        />
      </header>
      <main className={styles.container}>
        {users.length !== 0 && posts.length !== 0 && postsRender()}
        {(users.length === 0 || posts.length === 0) && (
          <EmptyRender text="Не найдено!" />
        )}
        {Array.isArray(chosen) && Boolean(chosen.length) && (
          <div className={styles.handlers}>
            <Button
              text="Удалить"
              type="button"
              size="large"
              onClick={openDeleteModal}
            />
            <Button
              text="Избранное"
              type="button"
              size="large"
              onClick={openAddModal}
            />
          </div>
        )}
        {isDeleteOpen && (
          <Modal onClose={() => onClose(closeDeleteModal)}>
            <PopupDelete closeModal={closeDeleteModal} id={chosen} />
          </Modal>
        )}
        {isAddOpen && Array.isArray(chosen) && (
          <Modal onClose={closeAddModal}>
            <PopupAddFafourite id={chosen} closeModal={closeAddModal} />
          </Modal>
        )}
        {isModeOpen && (
          <Modal onClose={() => onClose(closeModeModal)}>
            <PopupMode
              id={typeof chosen === "number" ? chosen : null}
              onClose={() => onClose(closeModeModal)}
            />
          </Modal>
        )}
        {error.text.length !== 0 && error.type === 'modal' && (
          <Modal onClose={() => onClose(closeErrorModal)}>
            <ErrorInfo error={error.text} />
          </Modal>
        )}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footer__container}>
          <FilterAmount amount={values.amount} onClick={amountHandler} />
          <Navigator
            page={page}
            setPage={setPage}
            amount={values.amount === "Все" ? posts.length : +values.amount}
          />
        </div>
      </footer>
    </>
  );
}
