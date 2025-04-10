import { FC, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import styles from "./CreateTask.module.css";

interface IPropsCreateTask {
  nombre?: string;
  descripcion?: string;
  fin?: Date;
  children?: React.ReactNode;
  onClose: () => void;
}

export const CreateTask: FC<IPropsCreateTask> = ({
  children,
  onClose,
}: IPropsCreateTask) => {
  const [task, setTask] = useState<ITarea>({
    titulo: "",
    descripcion: "",
    fechaLimite: new Date(),
  });

  // const [task] = useState<ITarea>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className={styles.containerCreateTaskModal} onClick={onClose}>
      <div className={styles.inputs} onClick={(e) => e.stopPropagation()}>
        <h2>Crear Tarea</h2>
        <input
          type="text"
          name="titulo"
          placeholder="Nombre: "
          onChange={handleChange}
          value={task.titulo}
          className={styles.tituloTask}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción: "
          value={task.descripcion}
          onChange={handleChange}
          className={styles.descripcionTask}
        />
        <input
          name="fechaLimite"
          type="date"
          placeholder="Fecha fin"
          value={task.fechaLimite.toISOString().split("T")[0]}
          className={styles.finTask}
          onChange={(e) =>
            setTask((prevTask) => ({
              ...prevTask,
              fechaLimite: new Date(e.target.value),
            }))
          }
        />
        {children}
      </div>
    </div>
  );
};
