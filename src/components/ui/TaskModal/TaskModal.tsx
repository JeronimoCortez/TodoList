import { FC, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import styles from "./TaskModal.module.css";
import CloseButton from "../CloseButton/CloseButton";
import OpenButton from "../OpenButton/OpenButton";

interface IPropsTask {
  handleClose: VoidFunction;
  taskToEdit?: ITarea;
}

export const TaskModal: FC<IPropsTask> = ({ handleClose, taskToEdit }) => {
  const initialValues: ITarea = taskToEdit
    ? taskToEdit
    : {
        id: "",
        titulo: "",
        descripcion: "",
        fechaLimite: new Date(),
        estado: 1,
      };

  const [task, setTask] = useState<ITarea>(initialValues);

  return (
    <div className={styles.containerTaskModal}>
      <form className={styles.inputs}>
        <h2>{taskToEdit ? "Editar Tarea" : "Crear Tarea"}</h2>

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
          onChange={(e) => setTask({ ...task, descripcion: e.target.value })}
          className={styles.descripcionTask}
        />
        <input
          type="date"
          placeholder="Fecha fin"
          onChange={(e) =>
            setTask({ ...task, fechaLimite: new Date(e.target.value) })
          }
          className={styles.finTask}
        />

        <div className={styles.buttons}>
          <OpenButton onClick={() => {}} />
          <CloseButton onClick={handleClose} />
        </div>
      </form>
    </div>
  );
};
