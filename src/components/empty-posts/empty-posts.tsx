import styles from "./empty-posts.module.css";

export default function EmptyRender({text}: {text:string}) {
    return(<div className={styles.error}>{text}</div>)
}
