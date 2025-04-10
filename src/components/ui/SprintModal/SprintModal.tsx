import { FC, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./SprintModal.module.css";
import CloseButton from "../CloseButton/CloseButton";
import AcceptButton from "../AcceptButton/AcceptButton";
import {
  createSprintController,
  updateSprintController,
} from "../../../data/todoListController";

interface IPropsSprint {
  handleClose: () => void;
  sprintToEdit?: ISprint;
}

const SprintModal: FC<IPropsSprint> = ({ handleClose, sprintToEdit }) => {
  const initialValues: ISprint = sprintToEdit
    ? sprintToEdit
    : {
        id: "",
        nombre: "",
        inicio: new Date(),
        fin: new Date(),
        tasks: [],
      };
  const [sprint, setSprint] = useState<ISprint>(initialValues);

  const createSprint = async () => {
    console.log("Creando sprint....");
    setSprint({ ...sprint, id: new Date().toISOString() });
    await createSprintController(sprint);
  };
  const updateSprint = async () => {
    console.log("Actualizando sprint...");
    await updateSprintController(sprint);
  };

  return (
    <div className={styles.containerSprintModal}>
      <form className={styles.inputs}>
        <h2>{sprintToEdit ? "Editar Sprint" : "Crear Sprint"}</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={sprint.nombre}
          onChange={(e) => setSprint({ ...sprint, nombre: e.target.value })}
          className={styles.nombreSprint}
        />
        <input
          type="date"
          placeholder="Fecha inicio"
          onChange={(e) =>
            setSprint({ ...sprint, inicio: new Date(e.target.value) })
          }
          className={styles.inicioSprint}
        />
        <input
          type="date"
          placeholder="Fecha fin"
          onChange={(e) =>
            setSprint({ ...sprint, fin: new Date(e.target.value) })
          }
          className={styles.finSprint}
        />

        <div className={styles.buttons}>
          <AcceptButton
            onClick={() => (sprintToEdit ? updateSprint() : createSprint())}
          />
          <CloseButton handleClose={handleClose} />
        </div>
      </form>
    </div>
  );
};

export default SprintModal;
