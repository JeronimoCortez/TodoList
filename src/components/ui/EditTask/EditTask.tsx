import { FC, useState } from "react";
import styles from "./EditTask.module.css";
import { ITarea } from "../../../types/ITarea";

interface IPropsEditTask {
  children?: React.ReactNode;
  tarea: ITarea;
  onClose: () => void;
}

export const EditTask: FC<IPropsEditTask> = ({ tarea, onClose, children }) => {
  const [task, setTask] = useState<ITarea>(tarea);
  return (
    <div className={styles.containerEditTaskModal} onClick={onClose}>
      <div className={styles.inputs} onClick={(e) => e.stopPropagation()}>
        <h2>Editar Tarea</h2>
        <input
          type="text"
          name="titulo"
          onChange={(e) => setTask({ ...task, titulo: e.target.value })}
          value={task.titulo}
          className={styles.tituloTask}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción: "
          value={task.descripcion}
          onChange={(e) => setTask({ ...task, descripcion: e.target.value })}
          className={styles.descripcionTask}
        />
        <input
          name="fechaLimite"
          type="date"
          placeholder="Fecha fin"
          // value={task.fechaLimite.toISOString().split("T")[0]}
          className={styles.finTask}
          onChange={(e) =>
            setTask({ ...task, fechaLimite: new Date(e.target.value) })
          }
        />
        {children}
      </div>
    </div>
  );
};
