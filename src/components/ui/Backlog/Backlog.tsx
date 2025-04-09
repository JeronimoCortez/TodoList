import { useEffect, useState } from "react";
import { getBacklogController } from "../../../data/backlogController";
import ListTareas from "../ListTareas/ListTareas";
import styles from "./Backlog.module.css";
import { ITarea } from "../../../types/ITarea";

const Backlog = () => {
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
      <div className={styles.containerTitleButton}>
        <h2 className={styles.title}>Backlog</h2>
        <button className={styles.buttonTask}>
          Crear nueva tarea <img src="./list.svg" alt="" />
        </button>
      </div>
      {tareas?.map((tarea) => (
        <ListTareas key={tarea.id} tarea={tarea} />
      ))}
    </div>
  );
};

export default Backlog;
