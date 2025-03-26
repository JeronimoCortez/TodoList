import styles from "./Backlog.module.css";

const Backlog = () => {
  return (
    <div className={styles.containerBacklog}>
      <h2 className={styles.title}>Backlog</h2>
      <button className={styles.buttonTask}>
        Crear nueva tarea <img src="./list.svg" alt="" />
      </button>
    </div>
  );
};

export default Backlog;
