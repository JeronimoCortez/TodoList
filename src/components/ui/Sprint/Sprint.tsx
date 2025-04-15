import { FC, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./Sprint.module.css";
import TaskCard from "../TaskCard/TaskCard";
import { estadosTareas } from "../../../enum/estadosTareas";
import { TaskModal } from "../TaskModal/TaskModal";

type IPropsSprint = {
  sprint: ISprint;
};

const Sprint: FC<IPropsSprint> = ({ sprint }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.containerSprint}>
      <div className={styles.titleButton}>
        <h3 className={styles.title}>{sprint.nombre}</h3>
        <button onClick={handleChangeModal} className={styles.button}>
          <img src="../addTask.svg" alt="icon add" />
        </button>
      </div>
      <div className={styles.containerTasks}>
        <div className={styles.tasks}>
          <h4 className={styles.titleTask}>Pendiente</h4>
          {sprint.tasks.map(
            (task) =>
              task.estado === estadosTareas.PENDIENTE && (
                <TaskCard key={task.id} tarea={task} idSprint={sprint.id} />
              )
          )}
        </div>
        <div className={styles.tasks}>
          <h4 className={styles.titleTask}>En progreso</h4>
          {sprint.tasks.map(
            (task) =>
              task.estado === estadosTareas.EN_PROGRESO && (
                <TaskCard key={task.id} tarea={task} idSprint={sprint.id} />
              )
          )}
        </div>
        <div className={styles.tasks}>
          <h4 className={styles.titleTask}>Completado</h4>
          {sprint.tasks.map(
            (task) =>
              task.estado === estadosTareas.COMPLETADO && (
                <TaskCard key={task.id} tarea={task} idSprint={sprint.id} />
              )
          )}
        </div>
      </div>
      {isModalOpen && (
        <TaskModal handleClose={handleChangeModal} idSprint={sprint.id} />
      )}
    </div>
  );
};

export default Sprint;
