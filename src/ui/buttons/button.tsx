import styles from "./button.module.css";

interface IButtonProps {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  size?: "small" | "large";
}

export default function Button({
  text,
  type = "button",
  onClick,
  size = "small",
}: IButtonProps) {
  return (
    <button 
        type={type} 
        className={styles.container} 
        onClick={onClick}
        style={size === "small" ? { width: '45xp' } : { width: '75xp' }}>
      {text}
    </button>
  );
}
