import { Dispatch, SetStateAction } from "react";
import { sortButtons } from "../../services/data";
import styles from "./sorting.module.css";


interface ISortProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSort: (e: React.MouseEvent<HTMLElement>) => void;
  sortSide: string | null;
  setSortSide: Dispatch<SetStateAction<"upToDown" | "downToUp" | null>>;
  sortType: string;
}

export default function Sorting({isOpen, setOpen, onSort, sortSide, setSortSide, sortType}: ISortProps) {
  return (
    <div className={styles.sorting}>
      <p className={styles.sorting__text}>Сортировать по: </p>
      <div className={styles.sorting__container}>
        <div className={styles.sort_options}>
          <div
            className={`${styles.filter_arrow} ${
              isOpen && styles.filter_arrow_active
            }`}
            onClick={() => {
              setOpen(!isOpen);
            }}
          />
          <p className={styles.sorting__text}>{sortType}</p>
          {isOpen && (
            <div className={styles.sort__list}>
              {sortButtons.map((button) => (
                <button
                  type="button"
                  className={styles.sort__listText}
                  onClick={onSort}
                  key={button}
                >
                  {button}
                </button>
              ))}
            </div>
          )}
        </div>
        {sortSide && (
          <div className={styles.sort_buttons}>
            <button
              className={styles.sort_buttons__button}
              type="button"
              onClick={() => setSortSide("upToDown")}
              style={
                sortSide === "upToDown" ? { backgroundColor: "#E6E0E9" } : {}
              }
            />
            <button
              className={`${styles.sort_buttons__button} ${styles.sort_buttons__button_flip}`}
              type="button"
              onClick={() => setSortSide("downToUp")}
              style={
                sortSide === "downToUp" ? { backgroundColor: "#E6E0E9" } : {}
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
