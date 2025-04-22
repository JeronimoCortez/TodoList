import { FC, useState } from "react";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import TaskEyeButton from "../TaskEyeButton/TaskEyeButton";
import styles from "./TaskCard.module.css";
import { ITarea } from "../../../types/ITarea";
import {
  deleteTaskSprint,
  postTaskSprintToBacklog,
  updateTaskBySprintController,
} from "../../../data/backlogController";
import { estadosTareas } from "../../../enum/estadosTareas";
import { TaskModal } from "../TaskModal/TaskModal";
import Swal from "sweetalert2";
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
  const { deleteTaskToSprint } = useSprint();
  const { sprintActivo } = sprintStore();

  const handleOpenModal = () => {
    if (tareaActiva) {
      setTareaActiva(null);
    } else {
      setTareaActiva(tarea);
    }
    setIsModalOpen(!isModalOpen);
  };

  const taskToBacklog = async () => {
    await postTaskSprintToBacklog(tarea, String(sprintActivo?.id));
  };

  const handleMoveTask = async () => {
    const nuevoEstado = tarea.estado + 1 < 2 ? tarea.estado + 1 : 2;
    const tareaActualizada: ITarea = { ...tarea, estado: nuevoEstado };
    await updateTaskBySprintController(
      String(sprintActivo?.id),
      tareaActualizada
    );
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
          <p>
            <b>Título: </b>
            {tarea.titulo}
          </p>
        </span>
        <span className={styles.descripcion}>
          <p>
            <b>Descripción: </b>
            {tarea.descripcion}
          </p>
        </span>
        <span className={styles.fecha}>
          <p>
            <b>Fecha Límite: </b> {new Date(tarea.fechaLimite).toISOString()}
          </p>
        </span>
      </div>
      <div className={styles.taskCardButtons}>
        <button onClick={taskToBacklog} className={styles.buttonSendBacklog}>
          Enviar al Backlog
        </button>
        <button onClick={handleMoveTask} className={styles.setTask}>
          {estadosTareas[tarea.estado] + " >>"}
        </button>

        <TaskEyeButton redirect={() => {}} />
        <EditButton onClick={handleOpenModal} />
        <DeleteButton handleDelete={deleteTask} />
      </div>

      {isModalOpen && <TaskModal handleClose={handleOpenModal} />}
    </div>
  );
};

export default TaskCard;
