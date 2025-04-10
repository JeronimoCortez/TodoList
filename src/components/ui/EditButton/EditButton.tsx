import { useState } from "react";
import styles from "./EditButton.module.css";
import { EditTask } from "../EditTask/EditTask";
import { ITarea } from "../../../types/ITarea";
import OpenButton from "../OpenButton/OpenButton";
import CloseButton from "../CloseButton/CloseButton";

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
        <EditTask tarea={tarea} onClose={() => setIsOpenModal(false)}>
          <div className={styles.buttons}>
            <OpenButton onClick={() => setIsOpenModal(true)} />
            <CloseButton onClick={() => setIsOpenModal(false)} />
          </div>
        </EditTask>
      )}
    </>
  );
};

export default EditButton;
