import { FC } from "react";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import TaskEyeButton from "../TaskEyeButton/TaskEyeButton";
import styles from "./TaskCard.module.css";
import { ITarea } from "../../../types/ITarea";

type IPropsITareaCard = {
  tarea: ITarea;
};

const TaskCard: FC<IPropsITareaCard> = (tarea) => {
  return (
    <div className={styles.taskCard}>
      <div className={styles.taskCardInfo}>
        <span className={styles.titulo}>
          <p>
            <b>Título: </b>
            {tarea.tarea.titulo}
          </p>
        </span>
        <span className={styles.descripcion}>
          <p>
            <b>Descripción: </b>
            {tarea.tarea.descripcion}
          </p>
        </span>
        <span className={styles.fecha}>
          <p>
            <b>Fecha Límite: </b> {tarea.tarea.fechaLimite.toISOString()}
          </p>
        </span>
      </div>
      <div className={styles.taskCardButtons}>
        <button className={styles.buttonSendBacklog}>Enviar al Backlog</button>
        <button className={styles.setTask}>En progreso...</button>
        {/* 
        hay que declarar las funciones de cada boton
        <TaskEyeButton />
        <EditButton />
        <DeleteButton /> */}
      </div>
    </div>
  );
};

export default TaskCard;
