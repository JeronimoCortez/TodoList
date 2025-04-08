import styles from "./CloseButton.module.css";

const CloseButton = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <button className={styles.closeButton} onClick={handleClose}>
      <img src="./close.svg" alt="Cerrar" />
    </button>
  );
};

export default CloseButton;
