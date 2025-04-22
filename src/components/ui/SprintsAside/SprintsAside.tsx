import { useEffect, useState } from "react";
import SprintCard from "../SprintCard/SprintCard";
import styles from "./SprintsAside.module.css";
import SprintModal from "../SprintModal/SprintModal";
import { useLocation, useNavigate } from "react-router-dom";
import useSprint from "../../../hooks/useSprint";
import { sprintStore } from "../../../store/sprintStore";

const SprintsAside = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const { getSprints, sprints } = useSprint();
  const { setSprintActivo } = sprintStore();
  const [sprintView, setSprintView] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNavigateToBacklog = () => {
    setSprintActivo(null);
    navigate("/");
  };
  useEffect(() => {
    getSprints();
    if (location.pathname.includes("sprint")) {
      setSprintView(true);
    }
  }, [location]);

  return (
    <div className={styles.containerAside}>
      <button
        onClick={handleNavigateToBacklog}
        className={styles.buttonBacklog}
      >
        Backlog <img src="../book.svg" alt="" />
      </button>
      <div className={styles.containerTitleButton}>
        <h3 className={styles.title}>
          Lista de sprints
          <button
            className={`${styles.buttonAddSprint} ${
              sprintView ? styles.disabledButton : ""
            }`}
            onClick={handleOpen}
          >
            <img className={styles.addIcon} src="../add.svg" alt="" />
          </button>
        </h3>
      </div>

      <div className={styles.line}></div>
      <div className={styles.sprintCardContainer}>
        {sprints?.map((sprint) => (
          <SprintCard sprint={sprint} />
        ))}
      </div>

      {isOpen && <SprintModal handleClose={handleClose} />}
    </div>
  );
};

export default SprintsAside;
