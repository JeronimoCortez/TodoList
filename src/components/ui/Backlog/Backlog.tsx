import { useState } from "react";
import { ITarea } from "../../../types/ITarea";
import ListTareas from "../ListTareas/ListTareas";
// import TaskCard from "../TaskCard/TaskCard";
import styles from "./Backlog.module.css";
import { CreateTask } from "../CreateTask/CreateTask";
import OpenButton from "../OpenButton/OpenButton";
import CloseButton from "../CloseButton/CloseButton";

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
        <ListTareas key={tarea.id} tarea={tarea} />
      ))}

      {isOpenModal && (
        <CreateTask onClose={() => setIsOpenModal(false)}>
          <div className={styles.buttons}>
            <OpenButton onClick={() => setIsOpenModal(true)} />
            <CloseButton onClick={() => setIsOpenModal(false)} />
          </div>
        </CreateTask>
      )}

      <ListTareas tareas={tareas} />
    </div>
  );
};

export default Backlog;
