import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import TaskEyeButton from "../TaskEyeButton/TaskEyeButton";
import styles from "./SprintCard.module.css";

const SprintCard = () => {
  return (
    <div className={styles.sprintCard}>
      <div className={styles.sprintCardHeader}>Sprint 1</div>
      <div className={styles.sprintCardInfo}>
        <div>Inicio: </div>
        <div>Fin: </div>
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
