import { useState } from "react";
import styles from "./EditButton.module.css";
import { ITarea } from "../../../types/ITarea";
import { TaskModal } from "../TaskModal/TaskModal";

interface IPropsEditButton {
  tarea: ITarea;
}

const EditButton = ({ tarea }: IPropsEditButton) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <button
        className={styles.editButton}
        onClick={() => setIsOpenModal(true)}
      >
        <img src="./edit.svg" alt="" />
      </button>

      {isOpenModal && (
        <TaskModal
          handleClose={() => setIsOpenModal(false)}
          taskToEdit={tarea}
        />
      )}
    </>
  );
};

export default EditButton;
