import Button from "../../ui/buttons/button";
import styles from "./popup-delete.module.css";

interface IPopupProps {
  closeModal: () => void;
  deleteHandler: () => void;
}

export default function PopupDelete({
  closeModal,
  deleteHandler,
}: IPopupProps) {
  return (
    <>
      <div className={styles.trash} />
      <div className={styles.buttons_container}>
        <Button text={"Да"} onClick={deleteHandler} />
        <Button text={"Нет"} onClick={closeModal} />
      </div>
    </>
  );
}
