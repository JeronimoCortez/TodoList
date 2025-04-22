import { FC, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import styles from "./TaskModal.module.css";
import CloseButton from "../CloseButton/CloseButton";
import AcceptButton from "../AcceptButton/AcceptButton";
import { taskStore } from "../../../store/taskStore";
import useTarea from "../../../hooks/useTarea";
import { sprintStore } from "../../../store/sprintStore";
import useSprint from "../../../hooks/useSprint";

interface IPropsTask {
  handleClose: VoidFunction;
}

export const TaskModal: FC<IPropsTask> = ({ handleClose }) => {
  const { tareaActiva } = taskStore();
  const { sprintActivo } = sprintStore();
  const { createTarea, updateTarea } = useTarea();
  const { createTaskSprint, updateTaskSprint } = useSprint();
  const initialValues: ITarea = tareaActiva
    ? tareaActiva
    : {
        id: new Date().toISOString(),
        titulo: "",
        descripcion: "",
        fechaLimite: new Date(),
        estado: 0,
      };

  const [task, setTask] = useState<ITarea>(initialValues);

  const submitForm = () => {
    if (tareaActiva) {
      if (sprintActivo) {
        updateTaskSprint(sprintActivo.id, task);
      } else {
        updateTarea(task);
      }
    } else {
      if (sprintActivo) {
        createTaskSprint(task, sprintActivo.id);
      } else {
        createTarea(task);
      }
    }
    handleClose();
  };
  return (
    <div className={styles.containerTaskModal}>
      <form className={styles.inputs}>
        <h2>{tareaActiva ? "Editar Tarea" : "Crear Tarea"}</h2>

        <input
          type="text"
          placeholder="Nombre:"
          value={task.titulo}
          onChange={(e) => setTask({ ...task, titulo: e.target.value })}
          className={styles.tituloTask}
        />
        <input
          type="string"
          placeholder="Descripción:"
          value={task.descripcion}
          onChange={(e) => setTask({ ...task, descripcion: e.target.value })}
          className={styles.descripcionTask}
        />
        <input
          type="date"
          placeholder="Fecha fin"
          value={
            task.fechaLimite
              ? new Date(task.fechaLimite).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
          onChange={(e) =>
            setTask({ ...task, fechaLimite: new Date(e.target.value) })
          }
          className={styles.finTask}
        />

        <div className={styles.buttons}>
          <AcceptButton onClick={submitForm} />
          <CloseButton handleClose={handleClose} />
        </div>
      </form>
    </div>
  );
};
