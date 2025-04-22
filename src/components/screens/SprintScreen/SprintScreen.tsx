import Header from "../../ui/Header/Header";
import Sprint from "../../ui/Sprint/Sprint";
import SprintsAside from "../../ui/SprintsAside/SprintsAside";
import styles from "./SprintScreen.module.css";
import { sprintStore } from "../../../store/sprintStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SprintScreen = () => {
  const { sprintActivo } = sprintStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!sprintActivo) {
      navigate("/");
    }
  }, [sprintActivo, navigate]);

  return (
    <>
      <Header />
      <div className={styles.containerSprint}>
        <SprintsAside />
        {sprintActivo && <Sprint />}
      </div>
    </>
  );
};

export default SprintScreen;
