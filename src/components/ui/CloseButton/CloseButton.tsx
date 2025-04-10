import { FC } from "react";
import styles from "./CloseButton.module.css";

interface IPropsCloseButton {
  onClick: () => void;
}

const CloseButton: FC<IPropsCloseButton> = ({ onClick }) => {
  return (
    <button className={styles.closeButton} onClick={onClick}>
      <img src="./close.svg" alt="" />
    </button>
  );
};

export default CloseButton;
