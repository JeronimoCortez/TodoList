import { FC, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import styles from "./TaskModal.module.css";
import CloseButton from "../CloseButton/CloseButton";
import AcceptButton from "../AcceptButton/AcceptButton";
import {
  createTaskToBacklog,
  createTaskToSprint,
  updateTaskBacklogController,
  updateTaskBySprintController,
} from "../../../data/backlogController";
import Swal from "sweetalert2";

interface IPropsTask {
  handleClose: VoidFunction;
  taskToEdit?: ITarea;
  idSprint?: String;
}

export const TaskModal: FC<IPropsTask> = ({
  handleClose,
  taskToEdit,
  idSprint,
}) => {
  const initialValues: ITarea = taskToEdit
    ? taskToEdit
    : {
        id: new Date().toISOString(),
        titulo: "",
        descripcion: "",
        fechaLimite: new Date(),
        estado: 0,
      };

  const [task, setTask] = useState<ITarea>(initialValues);

  const createTask = async () => {
    if (idSprint) {
      setTask({ ...task });
      console.log(task);
      console.log("Creando... ");
      await createTaskToSprint(task, String(idSprint));
    } else {
      setTask({ ...task });
      await createTaskToBacklog(task);
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: "La tarea se creo correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    handleClose();
  };

  const updateTask = async () => {
    if (idSprint) {
      await updateTaskBySprintController(String(idSprint), task);
    } else {
      await updateTaskBacklogController(task);
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: "La tarea se edito correctamente",
      showConfirmButton: false,
      timer: 1500,
    });

    handleClose();
  };

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
          value={task.descripcion}
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
          <AcceptButton onClick={taskToEdit ? updateTask : createTask} />
          <CloseButton handleClose={handleClose} />
        </div>
      </form>
    </div>
  );
};
