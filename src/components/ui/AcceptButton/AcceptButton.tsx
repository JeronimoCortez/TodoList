import { FC } from "react";
import styles from "./AcceptButton.module.css";

type IPropsAcceptButton = {
  onClick: VoidFunction;
};

const AcceptButton: FC<IPropsAcceptButton> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={styles.openButton}>
      <img src="./check.svg" alt="" />
    </button>
  );
};

export default AcceptButton;
