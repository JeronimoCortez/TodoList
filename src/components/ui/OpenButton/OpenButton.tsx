import { FC } from "react";
import styles from "./OpenButton.module.css";

type IOpenButton = {
  onClick?: VoidFunction;
};

const OpenButton: FC<IOpenButton> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.openButton}>
      <img src="./check.svg" alt="" />
    </button>
  );
};

export default OpenButton;
