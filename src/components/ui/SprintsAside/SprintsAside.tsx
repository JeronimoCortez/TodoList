import { ISprint } from "../../../types/ISprint";
import SprintCard from "../SprintCard/SprintCard";
import styles from "./SprintsAside.module.css";

const SprintsAside = () => {
  const sprint: ISprint = {
    nombre: "Sprint 1",
    inicio: new Date("2025-03-26"),
    fin: new Date("2025-03-31"),
    tasks: [],
  };

  return (
    <div className={styles.containerAside}>
      <button className={styles.buttonBacklog}>
        Backlog <img src="./book.svg" alt="" />
      </button>
      <div className={styles.containerTitleButton}>
        <h3 className={styles.title}>
          Lista de sprints
          <button className={styles.buttonAddSprint}>
            <img className={styles.addIcon} src="./add.svg" alt="" />
          </button>
        </h3>
      </div>

      <div className={styles.line}></div>

      <div className={styles.sprintCardContainer}>
        <SprintCard sprint={sprint} />
      </div>
    </div>
  );
};

export default SprintsAside;
