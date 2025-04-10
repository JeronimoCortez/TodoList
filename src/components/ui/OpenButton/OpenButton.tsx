import { FC } from "react";
import styles from "./OpenButton.module.css";

interface IPropsOpenButton {
  onClick: () => void;
}

const OpenButton: FC<IPropsOpenButton> = ({ onClick }) => {
  return (
    <button className={styles.openButton} onClick={onClick}>
      <img src="./check.svg" alt="" />
    </button>
  );
};

export default OpenButton;
