import { useState } from "react";
import { ISprint } from "../../../types/ISprint";
import SprintCard from "../SprintCard/SprintCard";
import SprintModal from "../SprintModal/SprintModal";
import styles from "./SprintsAside.module.css";

const SprintsAside = () => {
  const [isOpen, setOpen] = useState(false);
  const [sprints, setSprints] = useState<ISprint[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitSprint = (newSprint: ISprint) => {
    setSprints((prev) => {
      const exists = prev.some((s) => s.id === newSprint.id);
      if (exists) {
        return prev.map((s) => (s.id === newSprint.id ? newSprint : s));
      }
      return [...prev, newSprint];
    });
  };

  return (
    <div className={styles.containerAside}>
      <button className={styles.buttonBacklog}>
        Backlog <img src="./book.svg" alt="" />
      </button>
      <div className={styles.containerTitleButton}>
        <h3 className={styles.title}>
          Lista de sprints
          <button className={styles.buttonAddSprint} onClick={handleOpen}>
            <img
              className={styles.addIcon}
              src="./add.svg"
              alt="Agregar Sprint"
            />
          </button>
        </h3>
      </div>

      <div className={styles.line}></div>

      <div className={styles.sprintCardContainer}>
        {sprints.map((sprint) => (
          <SprintCard key={sprint.id} sprint={sprint} />
        ))}
      </div>

      {isOpen && (
        <SprintModal handleClose={handleClose} onSubmit={handleSubmitSprint} />
      )}
    </div>
  );
};

export default SprintsAside;
