import Header from "../../ui/Header/Header";
import Sprint from "../../ui/Sprint/Sprint";
import SprintsAside from "../../ui/SprintsAside/SprintsAside";
import styles from "./SprintScreen.module.css";

const SprintScreen = () => {
  return (
    <>
      <Header />
      <div className={styles.containerSprint}>
        <SprintsAside />
        <Sprint
          sprint={{
            nombre: "Sprint 1",
            inicio: new Date("2025-03-26"),
            fin: new Date("2025-03-31"),
            tasks: [],
          }}
        />
      </div>
    </>
  );
};

export default SprintScreen;
