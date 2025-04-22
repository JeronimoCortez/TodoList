import { FC, useEffect, useState } from "react";
import styles from "./ListTareas.module.css";
import { ITarea } from "../../../types/ITarea";
import TaskEyeButton from "../TaskEyeButton/TaskEyeButton";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { SendButton } from "../SendButton/SendButton";
import { TaskModal } from "../TaskModal/TaskModal";
import {
  deleteTaskBacklog,
  postTaskBacklogToSprint,
} from "../../../data/backlogController";
import Swal from "sweetalert2";
import { ISprint } from "../../../types/ISprint";
import { getSprintsController } from "../../../data/todoListController";

type IPropsITarea = {
  tarea: ITarea;
};

const ListTareas: FC<IPropsITarea> = ({ tarea }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sprints, setSprints] = useState<ISprint[]>([]);

  useEffect(() => {
    const fetchSprint = async () => {
      const sprintDb = await getSprintsController();
      if (sprintDb) {
        setSprints(sprintDb);
      }
    };
    fetchSprint();
  }, []);

  const handleChangeModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleDeleteTask = async () => {
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
        deleteTaskBacklog(tarea.id);
        Swal.fire({
          title: "Tarea eliminada!",
          text: "La tarea se elimino con exito!",
          icon: "success",
        });
      }
    });
  };

  const handleChangeSprint = async (e: string) => {
    await postTaskBacklogToSprint(tarea, e);
  };

  return (
    <>
      <div className={styles.tarea}>
        <div className={styles.containerData}>
          <p className={styles.titleContainer}>
            <span className={styles.titulo}>Título: </span>
            {tarea.titulo}
          </p>
          <p className={styles.titleContainer}>
            <span className={styles.descripcion}>Descripción: </span>
            {tarea.descripcion}
          </p>
          <p className={styles.titleContainer}>
            <span className={styles.fecha}>Fecha Límite: </span>
            {new Date(tarea.fechaLimite).toISOString()}
          </p>
        </div>
        <div className={styles.containerButton}>
          <button className={styles.enviar}>
            Enviar a <SendButton />
          </button>
          <div className={styles.selectContainer}>
            <select
              className={styles.select}
              onChange={(e) => handleChangeSprint(e.target.value)}
            >
              <option disabled selected>
                Seleccione una Sprint
              </option>
              {sprints.map((sprint) => (
                <option value={sprint.id} key={sprint.id}>
                  {sprint.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.acciones}>
            <TaskEyeButton redirect={() => {}} />
            <EditButton onClick={handleChangeModal} />
            <DeleteButton handleDelete={handleDeleteTask} />
          </div>
        </div>
      </div>

      {isOpenModal && (
        <TaskModal handleClose={handleChangeModal} taskToEdit={tarea} />
      )}
    </>
  );
};

export default ListTareas;
