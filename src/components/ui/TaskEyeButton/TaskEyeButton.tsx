import { FC } from "react";
import styles from "./TaskEyeButton.module.css";

type IPropsTaskEyeButton = {
  redirect: VoidFunction;
};

const TaskEyeButton: FC<IPropsTaskEyeButton> = ({ redirect }) => {
  return (
    <button onClick={redirect} className={styles.taskEyeButton}>
      <img src="../visibility.svg" alt="" />
    </button>
  );
};

export default TaskEyeButton;
