import styles from "./comment.module.css";

interface ICommentProps {
  name: string;
  email: string;
  body: string;
}

export default function Comment({ name, email, body }: ICommentProps) {
  return (
  <div className={styles.container}>
    <h3 className={styles.name}>{name}</h3>
    <p className={styles.info}>{email}</p>
    <p className={styles.text}>{body}</p>
  </div>
  );
}
