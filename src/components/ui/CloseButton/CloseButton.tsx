import styles from "./CloseButton.module.css";

const CloseButton = () => {
  return (
    <div className={styles.closeButton}>
      <img src="./close.svg" alt="" />
    </div>
  );
};

export default CloseButton;
