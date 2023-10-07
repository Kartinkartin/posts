import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../../hooks/use-modal";
import chatImage from "../../images/chat_bubble_outline.svg";
import chatActiveImage from "../../images/chat_bubble.svg";
import pencilIcon from "../../images/mode_edit_24px.svg";
import trashIcon from "../../images/delete_24px.svg";
import starEmptyIcon from "../../images/star_border.svg";
import starIcon from "../../images/star.svg";
import checkBox from "../../images/check_box_outline_blank.svg";
import fullCheckBox from "../../images/check_box.svg";
import { addToFav, choseManyPosts, chosePost } from "../../services/reducers/posts";
import { getCommentsPost } from "../api/api";
import Modal from "../../ui/modal/modal";
import { getComments } from "../../services/reducers/comments";
import styles from "./post.module.css";
import { TStore } from "../../services/types";
import { IComment } from "../../services/types/data";
import Comment from "../comment/comment";
import PopupMode from "../popup-mode/popup-mode";

interface IPostProps {
  title: string;
  author: string;
  text: string;
  id: number;
  onDelete: () => void;
}

export default function Post({ title, author, text, id, onDelete }: IPostProps) {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [showComments, setShowComments] = useState(false);
  const comments = useSelector((store: TStore) => store.comments);
  const { favourites, chosen } = useSelector((store: TStore) => store.posts);

  const checkHandler = (id: number) => {
    dispatch(choseManyPosts(id));
  };
  const chatHandler = async (id: number) => {
    if (!Object.hasOwn(comments, id) || comments[id].length === 0) {
      await getCommentsPost(id).then((comments) =>
        dispatch(getComments({ id, comments }))
      );
    }
    setShowComments(!showComments);
  };
  const addToFavHandler = (id: number) => {
    dispatch(addToFav(id));
  };
  const deleteHandler = (id: number) => {
    dispatch(chosePost(id));
    onDelete();
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      <p className={styles.author}>{author}</p>
      <div className={styles.handles}>
        <button
          type="button"
          className={styles.button}
          style={
            Array.isArray(chosen) && chosen.includes(id)
              ? { backgroundImage: `url(${fullCheckBox})` }
              : { backgroundImage: `url(${checkBox})` }
          }
          onClick={() => checkHandler(id)}
        />
        <button
          type="button"
          className={styles.button}
          style={
            showComments
              ? { backgroundImage: `url(${chatActiveImage})` }
              : { backgroundImage: `url(${chatImage})` }
          }
          onClick={() => chatHandler(id)}
        />
        <button
          type="button"
          className={styles.button}
          style={{ backgroundImage: `url(${pencilIcon})` }}
          onClick={openModal}
        />
        <button
          type="button"
          className={styles.button}
          style={{ backgroundImage: `url(${trashIcon})` }}
          onClick={() => deleteHandler(id)}
        />
        <button
          type="button"
          className={`${styles.button}`}
          style={
            favourites.includes(id)
              ? { backgroundImage: `url(${starIcon})` }
              : { backgroundImage: `url(${starEmptyIcon})` }
          }
          onClick={() => addToFavHandler(id)}
        />
      </div>
      {showComments && (
        <div className={styles.comments}>
          {comments[id].map((comment: IComment) => {
            const { name, email, body, id } = comment;
            return <Comment name={name} email={email} body={body} key={id} />;
          })}
        </div>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <PopupMode id={id} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
