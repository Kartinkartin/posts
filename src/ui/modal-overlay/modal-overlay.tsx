import styles from './modal-overlay.module.css';

type TOverlayProps = {
  onClick: () => void;
};
export default function ModalOverlay({ onClick }: TOverlayProps) {
  return <div className={styles.overlay} onClick={onClick} />;
}
