import { useDispatch } from "react-redux";
import { addToFav, deletePost } from "../../services/reducers/posts";
import Button from "../../ui/buttons/button";
import { deletePostReq } from "../api/api";
import styles from "./popup-add-favourite.module.css";

interface IPopupProps {
  closeModal: () => void;
  id: Array<number>;
}

export default function PopupAddFafourite({
  closeModal,
  id,
}: IPopupProps) {
  const dispatch = useDispatch();

  const addFavoriteHandler = (id: Array<number>) => {
    id.forEach(id => (
      dispatch(addToFav(id))
    ))
    closeModal();
  };
  return (
    <>
      <div className={styles.star} />
      <div className={styles.buttons_container}>
        <Button type={'submit'} text={"Да"} onClick={() => addFavoriteHandler(id)} />
        <Button text={"Нет"} onClick={closeModal} />
      </div>
    </>
  );
}
