import { useEffect, useState } from "react";
import ListTareas from "../ListTareas/ListTareas";
import styles from "./Backlog.module.css";
import { TaskModal } from "../TaskModal/TaskModal";

import useTarea from "../../../hooks/useTarea";

const Backlog = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { getTareas, tareas } = useTarea();

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <div className={styles.containerBacklog}>
      <div className={styles.containerTitleButton}>
        <h2 className={styles.title}>Backlog</h2>
        <button
          className={styles.buttonTask}
          onClick={() => setIsOpenModal(true)}
        >
          Crear nueva tarea <img src="./list.svg" alt="" />
        </button>
      </div>

      {tareas?.map((tarea) => (
        <ListTareas key={tarea.id} tarea={tarea} />
      ))}

      {isOpenModal && <TaskModal handleClose={() => setIsOpenModal(false)} />}
    </div>
  );
};

export default Backlog;
