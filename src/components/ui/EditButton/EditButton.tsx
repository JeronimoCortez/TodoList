import { FC } from "react";
import styles from "./EditButton.module.css";
type IPropsEditButton = {
  onClick: VoidFunction;
};

const EditButton: FC<IPropsEditButton> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.editButton}>
      <img src="./edit.svg" alt="" />
    </button>
  );
};

export default EditButton;
