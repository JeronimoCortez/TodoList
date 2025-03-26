import styles from "./DeleteButton.module.css";

const DeleteButton = () => {
  return (
    <div className={styles.deleteButton}>
      <img src="./delete.svg" alt="" />
    </div>
  );
};

export default DeleteButton;
