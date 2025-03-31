import { FC } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./Sprint.module.css";

type IPropsSprint = {
  sprint: ISprint;
};

const Sprint: FC<IPropsSprint> = (sprint) => {
  return (
    <div className={styles.containerSprint}>
      <div className={styles.titleButton}>
        <h3 className={styles.title}>{sprint.sprint.nombre}</h3>
        <button className={styles.button}>
          <img src="./addTask.svg" alt="icon add" />
        </button>
      </div>

      <div className={styles.containerTasks}>
        <div className={styles.tasks}>
          <h4 className={styles.titleTask}>Pendiente</h4>
        </div>
        <div className={styles.tasks}>
          <h4 className={styles.titleTask}>En progreso</h4>
        </div>
        <div className={styles.tasks}>
          <h4 className={styles.titleTask}>Completado</h4>
        </div>
      </div>
    </div>
  );
};

export default Sprint;
