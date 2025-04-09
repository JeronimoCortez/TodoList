import styles from "./AcceptButton.module.css";

const AcceptButton = () => {
  return (
    <button className={styles.openButton}>
      <img src="./check.svg" alt="" />
    </button>
  );
};

export default AcceptButton;
