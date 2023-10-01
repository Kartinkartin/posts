import styles from "./button.module.css";

interface IButtonProps {
    text: string, 
    onClick: () => void
}

export default function Button({text, onClick}: IButtonProps) {
    return(
        <button className={styles.container} onClick={onClick}>
            {text}
        </button>
    )
}
