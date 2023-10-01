import styles from "./post.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPostProps, TStore } from "../../services/types/index";
import chatImage from "../../images/chat_bubble_outline.svg";
import pencilIcon from "../../images/mode_edit_24px.svg";
import trashIcon from "../../images/delete_24px.svg";
import starEmptyIcon from "../../images/star_border.svg";
import starIcon from "../../images/star.svg";
import checkBox from "../../images/check_box_outline_blank.svg";
import { deletePost, addToFav } from "../../services/reducers/posts";
import { deletePostReq } from "../api/api";
import useModal from "../../hooks/use-modal";
import Modal from "../../ui/modal/modal";
import PopupDelete from "../popup-delete/popup-delete";


export default function Post({ title, author, text, id, inFavourite=false }: IPostProps) {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const checkHandler = () => {};
  const chatHandler = () => {};
  const addToFavHandler = (id: number) => {
    dispatch(addToFav(id));    
  };
  const modeHandler = () => {};
  const deleteHandler = (id: number) => {
    deletePostReq(id)
      .then(() => dispatch(deletePost(id)))
    
  };
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.author}>{author}</p>
      <p className={styles.text}>{text}</p>
      <div className={styles.handles}>
        <button
          type="button"
          className={styles.button}
          style={{ backgroundImage: `url(${checkBox})` }}
          onClick={checkHandler}
        />
        <button
          type="button"
          className={styles.button}
          style={{ backgroundImage: `url(${chatImage})` }}
          onClick={chatHandler}
        />
        <button
          type="button"
          className={styles.button}
          style={{ backgroundImage: `url(${pencilIcon})` }}
          onClick={modeHandler}
        />
        <button
          type="button"
          className={styles.button}
          style={{ backgroundImage: `url(${trashIcon})` }}
          onClick={openModal}
        />
        <button
          type="button"
          className={`${styles.button}`}
          style={inFavourite ? { backgroundImage: `url(${starIcon})` } : { backgroundImage: `url(${starEmptyIcon})` }}
          onClick={() => addToFavHandler(id)}
        />
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <PopupDelete closeModal={closeModal} deleteHandler={() => deleteHandler(id)} />
        </Modal>
      )}
    </div>
  );
}
