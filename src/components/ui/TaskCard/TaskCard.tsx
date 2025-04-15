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

type IPropsITareaCard = {
  tarea: ITarea;
  idSprint?: String;
};

const TaskCard: FC<IPropsITareaCard> = ({ tarea, idSprint }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const taskToBacklog = async () => {
    await postTaskSprintToBacklog(tarea, String(idSprint));
  };

  const handleMoveTask = async () => {
    const nuevoEstado = tarea.estado + 1 < 2 ? tarea.estado + 1 : 2;
    const tareaActualizada: ITarea = { ...tarea, estado: nuevoEstado };
    await updateTaskBySprintController(String(idSprint), tareaActualizada);
  };

  const deleteTask = async () => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar la tarea?",
      text: "Los cambios son irreversibles",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTaskSprint(tarea.id, String(idSprint));
        Swal.fire({
          title: "Tarea eliminada!",
          text: "La tarea se elimino con exito!",
          icon: "success",
        });
      }
    });
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

      {isModalOpen && (
        <TaskModal
          handleClose={handleOpenModal}
          taskToEdit={tarea}
          idSprint={idSprint}
        />
      )}
    </div>
  );
};

export default TaskCard;
