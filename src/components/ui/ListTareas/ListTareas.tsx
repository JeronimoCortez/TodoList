import { FC } from "react";
import styles from "./ListTareas.module.css";
import { ITarea } from "../../../types/ITarea";
import TaskEyeButton from "../TaskEyeButton/TaskEyeButton";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { SendButton } from "../SendButton/SendButton";

type IPropsITarea = {
  tarea: ITarea;
};

const ListTareas: FC<IPropsITarea> = ({ tarea }) => {
  return (
    <>
      <div className={styles.tarea}>
        <div className={styles.containerData}>
          <span className={styles.titulo}>Título: {tarea.titulo}</span>
          <span className={styles.descripcion}>
            Descripción: {tarea.descripcion}
          </span>
          <span className={styles.fecha}>
            Fecha Límite: {new Date(tarea.fechaLimite).toISOString()}
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
            <EditButton onClick={() => {}} />
            <DeleteButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListTareas;
