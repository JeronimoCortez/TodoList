import { FC, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import TaskEyeButton from "../TaskEyeButton/TaskEyeButton";
import styles from "./SprintCard.module.css";
import SprintModal from "../SprintModal/SprintModal";

type IPropsSprintCard = {
  sprint: ISprint;
};

const SprintCard: FC<IPropsSprintCard> = ({ sprint }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenCloseModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className={styles.sprintCard}>
      <div className={styles.sprintCardHeader}>{sprint.nombre}</div>
      <div className={styles.sprintCardInfo}>
        <div>Inicio: {new Date(sprint.inicio).toISOString()}</div>
        <div>Fin: {new Date(sprint.fin).toISOString()} </div>
      </div>
      <div className={styles.sprintCardButtons}>
        <TaskEyeButton />
        <EditButton onClick={handleOpenCloseModal} />
        <DeleteButton />
      </div>
      {openModal && (
        <SprintModal handleClose={handleOpenCloseModal} sprintToEdit={sprint} />
      )}
    </div>
  );
};

export default SprintCard;
