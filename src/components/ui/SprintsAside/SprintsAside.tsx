import styles from "./SprintsAside.module.css";

const SprintsAside = () => {
  return (
    <div className={styles.containerAside}>
      <button className={styles.buttonBacklog}>
        Backlog <img src="./book.svg" alt="" />
      </button>
      <div className={styles.containerTitleButton}>
        <h3 className={styles.title}>
          Lista de sprints
          <button className={styles.buttonAddSprint}>
            <img src="./add.svg" alt="" />
          </button>
        </h3>
      </div>

      <div className={styles.line}></div>
    </div>
  );
};

export default SprintsAside;
