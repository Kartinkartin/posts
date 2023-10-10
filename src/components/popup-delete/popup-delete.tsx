import { useDispatch } from "react-redux";
import { chosePost, deletePost } from "../../services/reducers/posts";
import Button from "../../ui/buttons/button";
import { deletePostReq } from "../api/api";
import styles from "./popup-delete.module.css";

interface IPopupProps {
  closeModal: () => void;
  id: number | Array<number>;
}

export default function PopupDelete({
  closeModal,
  id,
}: IPopupProps) {
  const dispatch = useDispatch();

  const deleteHandler = (id: number | Array<number>) => {
    if (typeof id === 'number') {
      deletePostReq(id).then(() => dispatch(deletePost(id)));
    } else {
      id.forEach(id => (
        deletePostReq(id).then(() => dispatch(deletePost(id)))
      ))
    }
    closeModal();
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
