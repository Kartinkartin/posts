import { useState } from "react";
import { amountPosts } from "../../services/data";
import styles from "./filter-amount.module.css";

interface IFilterProps {
  amount: string;
  onClick: (e: any) => void;
}
export default function FilterAmount({ amount, onClick }: IFilterProps) {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div className={styles.amount}>
      <p className={styles.filter__text}>{amount}</p>
      <div
        className={`${styles.filter_arrow} ${
          openFilter && styles.filter_arrow_active
        }`}
        onClick={() => {
          setOpenFilter(!openFilter);
        }}
      />
      {openFilter && (
        <div className={styles.filter__list}>
          <button
            type="button"
            className={styles.filter__listText}
            onClick={(e) => {
              setOpenFilter(false);
              onClick(e);
            }}
          >
            Все
          </button>
          {amountPosts.map((amount, index) => (
            <button
              type="button"
              className={styles.filter__listText}
              onClick={(e) => {
                setOpenFilter(false);
                onClick(e);
              }}
              key={index}
            >
              {amount}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
