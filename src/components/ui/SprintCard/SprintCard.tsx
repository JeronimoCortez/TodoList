import { FC } from "react";
import { ISprint } from "../../../types/ISprint";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import TaskEyeButton from "../TaskEyeButton/TaskEyeButton";
import styles from "./SprintCard.module.css";

type IPropsSprintCard = {
  sprint: ISprint;
};

const SprintCard: FC<IPropsSprintCard> = (sprint) => {
  return (
    <div className={styles.sprintCard}>
      <div className={styles.sprintCardHeader}>{sprint.sprint.nombre}</div>
      <div className={styles.sprintCardInfo}>
        <div>Inicio: {sprint.sprint.inicio.toISOString()}</div>
        <div>Fin: {sprint.sprint.fin.toISOString()} </div>
      </div>
      <div className={styles.sprintCardButtons}>
        <TaskEyeButton />
        <EditButton />
        <DeleteButton />
      </div>
    </div>
  );
};

export default SprintCard;
