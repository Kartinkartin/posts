import React, { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import arrowIcon from "../../images/arrow_drop_24px.svg";
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
    <div className={styles.filter_name}>
      <p className={styles.filter_name__text}>{author}</p>
      <div
        className={styles.filter_arrow}
        style={{ backgroundImage: `url(${arrowIcon})` }}
        onClick={() => {
          setOpenFilter(!openFilter);
        }}
      />
      {openFilter && (
        <div className={styles.filter_name__list}>
          {needAllChose && (
            <button
              type="button"
              className={styles.filter_name__listText}
              onClick={(e) => {setOpenFilter(false); onClick(e)}}
            >
              Все
            </button>
          )}
          {users.map(({ name, id }) => (
            <button
              type="button"
              className={styles.filter_name__listText}
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
