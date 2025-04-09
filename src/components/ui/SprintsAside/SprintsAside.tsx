import { useEffect, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import SprintCard from "../SprintCard/SprintCard";
import styles from "./SprintsAside.module.css";
import { getSprintsController } from "../../../data/todoListController";

const SprintsAside = () => {
  const [sprints, setSprints] = useState<ISprint[]>();

  const getSprints = async () => {
    const sprints = await getSprintsController();
    setSprints(sprints);
  };

  useEffect(() => {
    getSprints();
  }, []);

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
      {sprints?.map((sprint) => (
        <div key={sprint.id} className={styles.sprintCardContainer}>
          <SprintCard sprint={sprint} />
        </div>
      ))}
    </div>
  );
};

export default SprintsAside;
