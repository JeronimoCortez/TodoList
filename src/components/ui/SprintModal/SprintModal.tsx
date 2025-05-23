import { FC, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./SprintModal.module.css";
import CloseButton from "../CloseButton/CloseButton";
import AcceptButton from "../AcceptButton/AcceptButton";
import { sprintStore } from "../../../store/sprintStore";
import useSprint from "../../../hooks/useSprint";

interface IPropsSprint {
  handleClose: () => void;
  sprintEntry?: ISprint;
}

const SprintModal: FC<IPropsSprint> = ({ handleClose, sprintEntry }) => {
  const { sprintActivo } = sprintStore();
  const { createSprint, updateSprint } = useSprint();

  const initialValues: ISprint = sprintEntry
    ? sprintEntry
    : {
        id: new Date().toISOString(),
        nombre: "",
        inicio: new Date(),
        fin: new Date(),
        tasks: [],
      };
  const [sprint, setSprint] = useState<ISprint>(initialValues);

  const submitForm = () => {
    if (sprintActivo) {
      updateSprint(sprint);
    } else {
      createSprint(sprint);
    }
    handleClose();
  };

  return (
    <div className={styles.containerSprintModal}>
      <form className={styles.inputs}>
        <h2>{sprintEntry ? "Editar Sprint" : "Crear Sprint"}</h2>

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
          value={
            sprint.inicio
              ? new Date(sprint.inicio).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
          onChange={(e) =>
            setSprint({ ...sprint, inicio: new Date(e.target.value) })
          }
          className={styles.inicioSprint}
        />
        <input
          type="date"
          placeholder="Fecha fin"
          value={
            sprint.fin
              ? new Date(sprint.fin).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
          onChange={(e) =>
            setSprint({ ...sprint, fin: new Date(e.target.value) })
          }
          className={styles.finSprint}
        />

        <div className={styles.buttons}>
          <AcceptButton onClick={submitForm} />
          <CloseButton handleClose={handleClose} />
        </div>
      </form>
    </div>
  );
};

export default SprintModal;
