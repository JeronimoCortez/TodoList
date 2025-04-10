import { FC } from "react";
import styles from "./ListTareas.module.css";
import { ITarea } from "../../../types/ITarea";
import TaskEyeButton from "../TaskEyeButton/TaskEyeButton";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { SendButton } from "../SendButton/SendButton";

type IPropsITarea = {
  tareas: ITarea[];
};

const ListTareas: FC<IPropsITarea> = ({ tareas }) => {
  return (
    <>
      {tareas.map((tarea, index) => (
        <div key={index} className={styles.tarea}>
          <div className={styles.containerData}>
            <span className={styles.titulo}>Título: {tarea.titulo}</span>
            <span className={styles.descripcion}>
              Descripción: {tarea.descripcion}
            </span>
            <span className={styles.fecha}>
              Fecha Límite: {tarea.fechaLimite.toISOString()}
            </span>
          </div>
          <div className={styles.containerButton}>
            <button className={styles.enviar}>
              Enviar a <SendButton />
            </button>
            <div className={styles.selectContainer}>
              <select className={styles.select}>
                <option>Seleccione una Sprint</option>
              </select>
            </div>
            <div className={styles.acciones}>
              <TaskEyeButton />
              <EditButton tarea={tarea} />
              <DeleteButton />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListTareas;
