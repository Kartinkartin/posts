import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { TStore } from "../../services/types";
import styles from "./navigator.module.css";

interface INavigatorProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  amount: number;
}

export default function Navigator({page, setPage, amount}: INavigatorProps) {
  const posts = useSelector((store: TStore) => store.posts.posts);
  const nextPageHandler = () => {
    setPage((page) => page+1)
  };
  const prevPageHandler = () => {
    setPage((page) => page-1)
  };

  return (
    <div className={styles.navigator}>
      <button
        type="button"
        className={`${styles.navigator__button} ${styles.navigator__prev}`}
        onClick={prevPageHandler}
        disabled={page === 1}
      />
      <button
        type="button"
        className={`${styles.navigator__button} ${styles.navigator__next}`}
        onClick={nextPageHandler}
        disabled={page === Math.ceil(posts.length / +amount)}
      />
    </div>
  );
}
