import { ITarea } from "../../../types/ITarea";
import ListTareas from "../ListTareas/ListTareas";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./Backlog.module.css";

const Backlog = () => {
  const tareaEjemplo: ITarea = {
    titulo: "aaa",
    descripcion: "bbb",
    fechaLimite: new Date(),
  };

  return (
    <div className={styles.containerBacklog}>
      <h2 className={styles.title}>Backlog</h2>
      <button className={styles.buttonTask}>
        Crear nueva tarea <img src="./list.svg" alt="" />
      </button>

      <ListTareas tarea={tareaEjemplo} />
    </div>
  );
};

export default Backlog;
