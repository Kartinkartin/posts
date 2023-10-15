import React, { useState } from "react";
import { useSelector } from "react-redux";
import arrowIcon from "../../images/arrow_drop_24px.svg";
import arrowIconRotate from "../../images/arrow_drop_up_24px.svg"; 
import { TStore } from "../../services/types";
import styles from "./filter-user.module.css";

interface IFilterProps {
  author: string;
  onClick: (e: any) => void;
  needAllChose?: boolean;
}

export default function FilterUser({
  author,
  onClick,
  needAllChose = true,
}: IFilterProps) {
  const [openFilter, setOpenFilter] = useState(false);
  const users = useSelector((store: TStore) => store.users);

  return (
    <div className={styles.filter}>
      <p className={styles.filter__text}>{author}</p>
      <div
        className={`${styles.filter_arrow} ${openFilter && styles.filter_arrow_active}`}
        onClick={() => {
          setOpenFilter(!openFilter);
        }}
      />
      {openFilter && (
        <div className={styles.filter__list}>
          {needAllChose && (
            <button
              type="button"
              className={styles.filter__listText}
              onClick={(e) => {setOpenFilter(false); onClick(e)}}
            >
              Все
            </button>
          )}
          {users.map(({ name, id }) => (
            <button
              type="button"
              className={styles.filter__listText}
              onClick={(e) => {setOpenFilter(false); onClick(e)}}
              key={id}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
