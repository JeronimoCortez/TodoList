import { FC, useEffect, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./SprintModal.module.css";
import CloseButton from "../CloseButton/CloseButton";
import AcceptButton from "../AcceptButton/AcceptButton";

interface IPropsSprint {
  handleClose: () => void;
  sprintToEdit?: ISprint;
  onSubmit: (sprint: ISprint) => void;
}

const SprintModal: FC<IPropsSprint> = ({
  handleClose,
  sprintToEdit,
  onSubmit,
}) => {
  const [nombre, setNombre] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");

  useEffect(() => {
    if (sprintToEdit) {
      setNombre(sprintToEdit.nombre);
      setInicio(new Date(sprintToEdit.inicio).toISOString().split("T")[0]);
      setFin(new Date(sprintToEdit.fin).toISOString().split("T")[0]);
    }
  }, [sprintToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !inicio || !fin) {
      alert("Completa todos los campos");
      return;
    }

    const sprint: ISprint = {
      id: sprintToEdit?.id || "",
      nombre,
      inicio: new Date(inicio),
      fin: new Date(fin),
      tasks: sprintToEdit?.tasks || [],
    };

    onSubmit(sprint);
    handleClose();
  };

  return (
    <div className={styles.containerSprintModal}>
      <form onSubmit={handleSubmit} className={styles.inputs}>
        <h2>{sprintToEdit ? "Editar Sprint" : "Crear Sprint"}</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={styles.nombreSprint}
        />

        <input
          type="date"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          className={styles.inicioSprint}
        />

        <input
          type="date"
          value={fin}
          onChange={(e) => setFin(e.target.value)}
          className={styles.finSprint}
        />

        <div className={styles.buttons}>
          <AcceptButton />
          <CloseButton handleClose={handleClose} />
        </div>
      </form>
    </div>
  );
};

export default SprintModal;
