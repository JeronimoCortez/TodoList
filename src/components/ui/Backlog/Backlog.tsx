import { useState } from "react";
import { ITarea } from "../../../types/ITarea";
import ListTareas from "../ListTareas/ListTareas";
// import TaskCard from "../TaskCard/TaskCard";
import styles from "./Backlog.module.css";
import { CreateTask } from "../CreateTask/CreateTask";
import OpenButton from "../OpenButton/OpenButton";
import CloseButton from "../CloseButton/CloseButton";

const Backlog = () => {
  const tareasEjemplo: ITarea[] = [
    {
      titulo: "aaa",
      descripcion: "bbb",
      fechaLimite: new Date(),
    },
    {
      titulo: "bbb",
      descripcion: "ccc",
      fechaLimite: new Date(),
    },
    {
      titulo: "ccc",
      descripcion: "ddd",
      fechaLimite: new Date(),
    },
    {
      titulo: "ddd",
      descripcion: "eee",
      fechaLimite: new Date(),
    },
  ];

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className={styles.containerBacklog}>
      <h2 className={styles.title}>Backlog</h2>
      <button
        className={styles.buttonTask}
        onClick={() => setIsOpenModal(true)}
      >
        Crear nueva tarea <img src="./list.svg" alt="" />
      </button>

      {isOpenModal && (
        <CreateTask onClose={() => setIsOpenModal(false)}>
          <div className={styles.buttons}>
            <OpenButton onClick={() => setIsOpenModal(true)} />
            <CloseButton onClick={() => setIsOpenModal(false)} />
          </div>
        </CreateTask>
      )}

      <ListTareas tareas={tareasEjemplo} />
    </div>
  );
};

export default Backlog;
