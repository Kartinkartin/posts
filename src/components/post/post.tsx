import styles from "./post.module.css";
import chatImage from "../../images/chat_bubble_outline.svg";
import pencilIcon from "../../images/mode_edit_24px.svg";
import trashIcon from "../../images/delete_24px.svg";
import starIcon from "../../images/star_border.svg";
import checkBox from "../../images/check_box_outline_blank.svg";

interface IPostProps {
  title: string;
  author: string;
  text: string;
  id: number;
}
export default function Post({ title, author, text, id }: IPostProps) {
    const checkHandler = () => {}
    const chatHandler = () => {}
    const modeHandler = () => {}
    const deleteHandler = (id: number) => {
        debugger;
    }
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
          onClick={() => deleteHandler(id)}
        />
        <button
          type="button"
          className={styles.button}
          style={{ backgroundImage: `url(${starIcon})` }}
        />
      </div>
    </div>
  );
}
