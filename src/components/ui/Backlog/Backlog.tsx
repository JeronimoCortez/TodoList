import { useEffect, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import ListTareas from "../ListTareas/ListTareas";
import styles from "./Backlog.module.css";
import { TaskModal } from "../TaskModal/TaskModal";
import { getBacklogController } from "../../../data/backlogController";

const Backlog = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tareas, setTareas] = useState<ITarea[]>();

  const getTareas = async () => {
    const tareasDb = await getBacklogController();
    setTareas(tareasDb);
  };

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <div className={styles.containerBacklog}>
      <h2 className={styles.title}>Backlog</h2>
      <button
        className={styles.buttonTask}
        onClick={() => setIsOpenModal(true)}
      >
        Crear nueva tarea <img src="./list.svg" alt="" />
      </button>

      {tareas?.map((tarea) => (
        <ListTareas key={tarea.id} tareas={tareas} />
      ))}

      {isOpenModal && <TaskModal handleClose={() => setIsOpenModal(false)} />}
    </div>
  );
};

export default Backlog;
