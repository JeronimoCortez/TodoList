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
          <span className={styles.titulo}>Título: {tarea.titulo}</span>
          <span className={styles.descripcion}>
            Descripción: {tarea.descripcion}
          </span>
          <span className={styles.fecha}>
            Fecha Límite: {new Date(tarea.fechaLimite).toISOString()}
          </span>
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
