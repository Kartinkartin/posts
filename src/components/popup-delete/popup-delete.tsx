import { useDispatch } from "react-redux";
import { deletePost } from "../../services/reducers/posts";
import Button from "../../ui/buttons/button";
import { deletePostReq } from "../api/api";
import styles from "./popup-delete.module.css";
import { throwError } from "../../services/reducers/error";

interface IPopupProps {
  closeModal: () => void;
  id: number | Array<number>;
}

export default function PopupDelete({ closeModal, id }: IPopupProps) {
  const dispatch = useDispatch();

  const deleteHandler = (id: number | Array<number>) => {
    if (typeof id === "number") {
      deletePostReq(id)
        .then(() => dispatch(deletePost(id)))
        .catch(() =>
          dispatch(
            throwError({
              text: "Can't delete post. Server error",
              type: "modal",
            })
          )
        );
    } else {
      id.forEach((id) =>
        deletePostReq(id)
          .then(() => dispatch(deletePost(id)))
          .catch(() =>
            dispatch(
              throwError({
                text: "Can't delete post. Server error",
                type: "modal",
              })
            )
          )
      );
    }
    closeModal();
  };

  return (
    <>
      <div className={styles.trash} />
      <div className={styles.buttons_container}>
        <Button type={"submit"} text={"Да"} onClick={() => deleteHandler(id)} />
        <Button text={"Нет"} onClick={closeModal} />
      </div>
    </>
  );
}
