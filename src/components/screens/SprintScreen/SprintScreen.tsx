import { useParams } from "react-router-dom";
import Header from "../../ui/Header/Header";
import Sprint from "../../ui/Sprint/Sprint";
import SprintsAside from "../../ui/SprintsAside/SprintsAside";
import styles from "./SprintScreen.module.css";
import { getSprintByIdController } from "../../../data/todoListController";
import { useEffect, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import { sprintStore } from "../../../store/sprintStore";

const SprintScreen = () => {
  // const { id } = useParams();
  // const [sprint, setSprint] = useState<ISprint | null>(null);

  // useEffect(() => {
  //   const fetchSprint = async () => {
  //     if (id) {
  //       const sprintData = await getSprintByIdController(id);
  //       if (sprintData) setSprint(sprintData);
  //     }
  //   };

  //   fetchSprint();
  // }, [id]);

  const { sprintActivo } = sprintStore();

  return (
    <>
      <Header />
      <div className={styles.containerSprint}>
        <SprintsAside />
        {sprintActivo && <Sprint sprint={sprintActivo} />}
      </div>
    </>
  );
};

export default SprintScreen;
