import { Dispatch, SetStateAction } from "react";
import starEmptyIcon from "../../images/star_border.svg";
import starFullIcon from "../../images/star.svg";
import styles from "./filter-star.module.css";

interface IFilterProps {
  filter: boolean;
  setFilter: Dispatch<SetStateAction<boolean>>
}

export default function FilterStar({filter, setFilter}: IFilterProps) {
  return (
    <button
      className={styles.filter_star}
      style={
        filter
          ? { backgroundImage: `url(${starFullIcon})` }
          : { backgroundImage: `url(${starEmptyIcon})` }
      }
      type="button"
      onClick={() => setFilter(!filter)}
    />
  );
}
