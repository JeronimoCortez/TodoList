import { ITarea } from "../../../types/ITarea";
import Backlog from "../../ui/Backlog/Backlog";
import Header from "../../ui/Header/Header";
import ListTareas from "../../ui/ListTareas/ListTareas";
import SprintsAside from "../../ui/SprintsAside/SprintsAside";
import styles from "./BacklogScreen.module.css";

const BacklogScreen = () => {
  const tareaEjemplo: ITarea = {
    titulo: "aaa",
    descripcion: "bbb",
    fechaLimite: new Date(),
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <SprintsAside />
        <div className={styles.Backlog}>
          <Backlog />
        </div>
        <div className={styles.listTareas}>
          <ListTareas tarea={tareaEjemplo} />
        </div>
      </div>
    </>
  );
};

export default BacklogScreen;
