import { FC, useState } from "react";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import TaskEyeButton from "../TaskEyeButton/TaskEyeButton";
import styles from "./TaskCard.module.css";
import { ITarea } from "../../../types/ITarea";
import { estadosTareas } from "../../../enum/estadosTareas";
import { TaskModal } from "../TaskModal/TaskModal";
import { taskStore } from "../../../store/taskStore";
import useSprint from "../../../hooks/useSprint";
import { sprintStore } from "../../../store/sprintStore";

type IPropsITareaCard = {
  tarea: ITarea;
};

const TaskCard: FC<IPropsITareaCard> = ({ tarea }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setTareaActiva = taskStore((state) => state.setTareaActiva);
  const { tareaActiva } = taskStore();
  const { updateTaskSprint } = useSprint();
  const { deleteTaskToSprint, taskToBacklog } = useSprint();
  const { sprintActivo } = sprintStore();

  const handleOpenModal = () => {
    if (tareaActiva) {
      setTareaActiva(null);
    } else {
      setTareaActiva(tarea);
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleMoveTask = async () => {
    let nuevoEstado;
    if (tarea.estado === 2) {
      nuevoEstado = 0;
    } else {
      nuevoEstado = tarea.estado + 1;
    }
    const tareaActualizada: ITarea = { ...tarea, estado: nuevoEstado };
    updateTaskSprint(String(sprintActivo?.id), tareaActualizada);
  };

  const submitTaskToBacklog = () => {
    if (sprintActivo) {
      taskToBacklog(tarea, sprintActivo?.id);
    }
  };

  const deleteTask = async () => {
    if (sprintActivo) {
      deleteTaskToSprint(tarea.id, sprintActivo.id);
      console.log(sprintActivo);
    }
  };

  return (
    <div className={styles.taskCard}>
      <div className={styles.taskCardInfo}>
        <span className={styles.titulo}>
          <b>Título: </b>
          {tarea.titulo}
        </span>
        <span className={styles.descripcion}>
          <b>Descripción: </b>
          {tarea.descripcion}
        </span>
        <span className={styles.fecha}>
          <b>Fecha Límite: </b>{" "}
          {new Date(tarea.fechaLimite).toISOString().split("T")[0]}
        </span>
      </div>
      <div className={styles.taskCardButtons}>
        <div className={styles.actionButtons}>
          <TaskEyeButton redirect={() => {}} />
          <EditButton onClick={handleOpenModal} />
          <DeleteButton handleDelete={deleteTask} />
        </div>
        <div className={styles.backlogButtons}>
          <button
            onClick={submitTaskToBacklog}
            className={styles.buttonSendBacklog}
          >
            Enviar al Backlog
          </button>
          <button onClick={handleMoveTask} className={styles.setTask}>
            {estadosTareas[tarea.estado] + " >>"}
          </button>
        </div>
      </div>

      {isModalOpen && <TaskModal handleClose={handleOpenModal} />}
    </div>
  );
};

export default TaskCard;
