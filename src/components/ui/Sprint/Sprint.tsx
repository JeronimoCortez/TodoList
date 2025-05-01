import { useEffect, useState } from "react";
import styles from "./Sprint.module.css";
import TaskCard from "../TaskCard/TaskCard";
import { TaskModal } from "../TaskModal/TaskModal";
import { sprintStore } from "../../../store/sprintStore";
import { useParams } from "react-router-dom";
import { SprintService } from "../../../services/SprintService";

const Sprint = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sprintActivo } = sprintStore();
  const setSprintActivo = sprintStore((state) => state.setSprintActivo);
  const sprintService = new SprintService();
  useEffect(() => {
    if (id) {
      const fetchSprint = async () => {
        const sprintById = await sprintService.getSprint(id);
        if (sprintById) {
          console.log(sprintById);
          setSprintActivo(sprintById);
        }
      };

      fetchSprint();
    }
  }, [id]);

  const handleChangeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.containerSprint}>
      <div className={styles.titleButton}>
        <h3 className={styles.title}>{sprintActivo?.nombre}</h3>
        <button onClick={handleChangeModal} className={styles.button}>
          <img src="../addTask.svg" alt="icon add" />
        </button>
      </div>
      <div className={styles.containerTasks}>
        <div className={styles.tasks}>
          <h4 className={styles.titleTask}>Pendiente</h4>
          {sprintActivo?.tasks.map(
            (task) =>
              task.estado === 0 && <TaskCard key={task.id} tarea={task} />
          )}
        </div>
        <div className={styles.tasks}>
          <h4 className={styles.titleTask}>En progreso</h4>
          {sprintActivo?.tasks.map(
            (task) =>
              task.estado === 1 && <TaskCard key={task.id} tarea={task} />
          )}
        </div>
        <div className={styles.tasks}>
          <h4 className={styles.titleTask}>Completado</h4>
          {sprintActivo?.tasks.map(
            (task) =>
              task.estado === 2 && <TaskCard key={task.id} tarea={task} />
          )}
        </div>
      </div>
      {isModalOpen && <TaskModal handleClose={handleChangeModal} />}
    </div>
  );
};

export default Sprint;
