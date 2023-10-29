import styles from "./error.module.css";

interface IErrorProps {
  error: string;
  type?: string;
}

export default function ErrorInfo({ error, type = 'modal' }: IErrorProps) {
  return (
    <>
      <div
        className={`${styles.container} ${
          type === "context" && styles.container_context
        }`}
        style={type === "modal" ? { maxWidth: "30vw" } : {}}
      ></div>
      <p className={styles.text}>{error}</p>
    </>
  );
}
