import { FC, useState } from "react";
import styles from "./ListTareas.module.css";
import { ITarea } from "../../../types/ITarea";
import TaskEyeButton from "../TaskEyeButton/TaskEyeButton";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { SendButton } from "../SendButton/SendButton";
import { TaskModal } from "../TaskModal/TaskModal";
import { postTaskBacklogToSprint } from "../../../data/backlogController";
import useTarea from "../../../hooks/useTarea";
import { sprintStore } from "../../../store/sprintStore";
import { taskStore } from "../../../store/taskStore";

type IPropsITarea = {
  tarea: ITarea;
};

const ListTareas: FC<IPropsITarea> = ({ tarea }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [idSprint, setIdSprint] = useState("");
  const { sprints } = sprintStore();
  const { tareaActiva } = taskStore();
  const setTareaActiva = taskStore((state) => state.setTareaActiva);
  const { deleteTarea, taskToSprint } = useTarea();

  const handleChangeModal = () => {
    if (tareaActiva) {
      setTareaActiva(null);
    } else {
      setTareaActiva(tarea);
    }
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <div className={styles.tarea}>
        <div className={styles.containerData}>
          <p className={styles.titleContainer}>
            <span className={styles.titulo}>Título: </span>
            {tarea.titulo}
          </p>
          <p className={styles.titleContainer}>
            <span className={styles.descripcion}>Descripción: </span>
            {tarea.descripcion}
          </p>
          <p className={styles.titleContainer}>
            <span className={styles.fecha}>Fecha Límite: </span>
            {new Date(tarea.fechaLimite).toISOString()}
          </p>
        </div>
        <div className={styles.containerButton}>
          <button
            onClick={() => taskToSprint(tarea, idSprint)}
            className={styles.enviar}
          >
            Enviar a <SendButton />
          </button>
          <div className={styles.selectContainer}>
            <select
              className={styles.select}
              onChange={(e) => setIdSprint(e.target.value)}
            >
              <option disabled selected>
                Seleccione una Sprint
              </option>
              {sprints.map((sprint) => (
                <option value={sprint.id} key={sprint.id}>
                  {sprint.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.acciones}>
            <TaskEyeButton redirect={() => {}} />
            <EditButton onClick={handleChangeModal} />
            <DeleteButton handleDelete={() => deleteTarea(tarea.id)} />
          </div>
        </div>
      </div>

      {isOpenModal && <TaskModal handleClose={handleChangeModal} />}
    </>
  );
};

export default ListTareas;
