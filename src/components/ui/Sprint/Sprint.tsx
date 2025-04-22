import { useState } from "react";
import styles from "./Sprint.module.css";
import TaskCard from "../TaskCard/TaskCard";
import { estadosTareas } from "../../../enum/estadosTareas";
import { TaskModal } from "../TaskModal/TaskModal";
import { sprintStore } from "../../../store/sprintStore";

const Sprint = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sprintActivo } = sprintStore();

  const handleChangeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.containerSprint}>
      <div className={styles.titleButton}>
        <h3 className={styles.title}>{sprintActivo?.nombre}</h3>
        <button onClick={handleChangeModal} className={styles.button}>
          <img src="../addTask.svg" alt="icon add" />
        </button>
      </div>
      <div className={styles.containerTasks}>
        <div className={styles.tasks}>
          <h4 className={styles.titleTask}>Pendiente</h4>
          {sprintActivo?.tasks.map(
            (task) =>
              task.estado === estadosTareas.PENDIENTE && (
                <TaskCard key={task.id} tarea={task} />
              )
          )}
        </div>
        <div className={styles.tasks}>
          <h4 className={styles.titleTask}>En progreso</h4>
          {sprintActivo?.tasks.map(
            (task) =>
              task.estado === estadosTareas.EN_PROGRESO && (
                <TaskCard key={task.id} tarea={task} />
              )
          )}
        </div>
        <div className={styles.tasks}>
          <h4 className={styles.titleTask}>Completado</h4>
          {sprintActivo?.tasks.map(
            (task) =>
              task.estado === estadosTareas.COMPLETADO && (
                <TaskCard key={task.id} tarea={task} />
              )
          )}
        </div>
      </div>
      {isModalOpen && <TaskModal handleClose={handleChangeModal} />}
    </div>
  );
};

export default Sprint;
