import { FC, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import TaskEyeButton from "../TaskEyeButton/TaskEyeButton";
import styles from "./SprintCard.module.css";
import SprintModal from "../SprintModal/SprintModal";
import Swal from "sweetalert2";
import { deleteSprintController } from "../../../data/todoListController";
import { useNavigate } from "react-router-dom";

type IPropsSprintCard = {
  sprint: ISprint;
};

const SprintCard: FC<IPropsSprintCard> = ({ sprint }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenCloseModal = () => {
    setOpenModal(!openModal);
  };

  const redirectToSprintView = () => {
    navigate(`/sprint/${sprint.id}`);
  };

  const deleteSprint = async () => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar el sprint?",
      text: "Los cambios son irreversibles",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSprintController(sprint.id);
        Swal.fire({
          title: "Sprint eliminado!",
          text: "El sprint se elimino con exito!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className={styles.sprintCard}>
      <div className={styles.sprintCardHeader}>{sprint.nombre}</div>
      <div className={styles.sprintCardInfo}>
        <div>Inicio: {new Date(sprint.inicio).toISOString()}</div>
        <div>Fin: {new Date(sprint.fin).toISOString()} </div>
      </div>
      <div className={styles.sprintCardButtons}>
        <TaskEyeButton redirect={redirectToSprintView} />
        <EditButton onClick={handleOpenCloseModal} />
        <DeleteButton handleDelete={deleteSprint} />
      </div>
      {openModal && (
        <SprintModal handleClose={handleOpenCloseModal} sprintToEdit={sprint} />
      )}
    </div>
  );
};

export default SprintCard;
