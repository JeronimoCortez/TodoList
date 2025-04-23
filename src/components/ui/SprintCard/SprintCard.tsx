import { FC, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import TaskEyeButton from "../TaskEyeButton/TaskEyeButton";
import styles from "./SprintCard.module.css";
import SprintModal from "../SprintModal/SprintModal";
import { useNavigate, useParams } from "react-router-dom";
import { sprintStore } from "../../../store/sprintStore";
import useSprint from "../../../hooks/useSprint";

type IPropsSprintCard = {
  sprint: ISprint;
};

const SprintCard: FC<IPropsSprintCard> = ({ sprint }) => {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const setSprintActivo = sprintStore((state) => state.setSprintActivo);
  const { sprintActivo } = sprintStore();
  const { deleteSprint } = useSprint();
  const navigate = useNavigate();

  const handleOpenCloseModal = () => {
    if (sprintActivo && !id) {
      setSprintActivo(null);
    } else {
      setSprintActivo(sprint);
    }
    setOpenModal(!openModal);
  };

  const redirectToSprintView = () => {
    setSprintActivo(sprint);
    navigate(`/sprint/${sprint.id}`);
  };

  return (
    <div className={styles.sprintCard}>
      <div className={styles.sprintCardHeader}>{sprint.nombre}</div>
      <div className={styles.sprintCardInfo}>
        <div>Inicio: {new Date(sprint.inicio).toISOString().split("T")[0]}</div>
        <div>Fin: {new Date(sprint.fin).toISOString().split("T")[0]} </div>
      </div>
      <div className={styles.sprintCardButtons}>
        <TaskEyeButton redirect={redirectToSprintView} />
        <EditButton onClick={handleOpenCloseModal} />
        <DeleteButton handleDelete={() => deleteSprint(sprint.id)} />
      </div>
      {openModal && (
        <SprintModal handleClose={handleOpenCloseModal} sprintEntry={sprint} />
      )}
    </div>
  );
};

export default SprintCard;
