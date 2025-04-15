import { FC } from "react";
import styles from "./DeleteButton.module.css";

type IPropsDeleteButton = {
  handleDelete: VoidFunction;
};

const DeleteButton: FC<IPropsDeleteButton> = ({ handleDelete }) => {
  return (
    <button onClick={handleDelete} className={styles.deleteButton}>
      <img src="../delete.svg" alt="" />
    </button>
  );
};

export default DeleteButton;
