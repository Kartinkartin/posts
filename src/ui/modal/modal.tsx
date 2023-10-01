import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

type TModalProps = {
  children?: JSX.Element;
  onClose: () => void;
  needCloseBtn?: boolean;
};

export default function Modal({
  children,
  onClose,
  needCloseBtn = true,
}: TModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);
  return ReactDOM.createPortal(
    <section className={styles.popup}>
      <ModalOverlay onClick={onClose} />
      <div className={styles.container}>
          <button 
            className={styles.button_close}
            onClick={() => {}}
          />
        {children}
      </div>
    </section>,
    document.getElementById('modals')!
  );
}
