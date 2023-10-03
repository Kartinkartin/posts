import { useDispatch } from "react-redux";
import { deletePost } from "../../services/reducers/posts";
import Button from "../../ui/buttons/button";
import { deletePostReq } from "../api/api";
import styles from "./popup-delete.module.css";

interface IPopupProps {
  closeModal: () => void;
  id: number;
}

export default function PopupDelete({
  closeModal,
  id,
}: IPopupProps) {
  const dispatch = useDispatch();

  const deleteHandler = (id: number) => {
    deletePostReq(id).then(() => dispatch(deletePost(id)));
  };
  return (
    <>
      <div className={styles.trash} />
      <div className={styles.buttons_container}>
        <Button type={'submit'} text={"Да"} onClick={() => deleteHandler(id)} />
        <Button text={"Нет"} onClick={closeModal} />
      </div>
    </>
  );
}
