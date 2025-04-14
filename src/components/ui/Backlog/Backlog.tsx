import { useEffect, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import ListTareas from "../ListTareas/ListTareas";
import styles from "./Backlog.module.css";
<<<<<<< HEAD
import { TaskModal } from "../TaskModal/TaskModal";
=======
import { CreateTask } from "../CreateTask/CreateTask";
import OpenButton from "../OpenButton/OpenButton";
import CloseButton from "../CloseButton/CloseButton";
>>>>>>> 2900c2a528c2821121d68ae677cb5e57eb47bfc8
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
<<<<<<< HEAD
        <ListTareas key={tarea.id} tareas={tareas} />
      ))}

      {isOpenModal && <TaskModal handleClose={() => setIsOpenModal(false)} />}
=======
        <ListTareas tarea={tarea} />
      ))}

      {isOpenModal && (
        <CreateTask onClose={() => setIsOpenModal(false)}>
          <div className={styles.buttons}>
            <OpenButton onClick={() => setIsOpenModal(true)} />
            <CloseButton onClick={() => setIsOpenModal(false)} />
          </div>
        </CreateTask>
      )}
>>>>>>> 2900c2a528c2821121d68ae677cb5e57eb47bfc8
    </div>
  );
};

export default Backlog;
