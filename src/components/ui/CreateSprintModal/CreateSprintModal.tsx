import { FC, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./CreateSprintModal.module.css";
import CloseButton from "../CloseButton/CloseButton";
import OpenButton from "../OpenButton/OpenButton";
import { createSprintController } from "../../../data/todoListController";

interface IPropsCreateSprint {
  id?: string;
  nombre?: string;
  inicio?: Date;
  fin?: Date;
}

export const CreateSprintModal: FC<IPropsCreateSprint> = () => {
  const initialValues: ISprint = {
    id: "",
    nombre: "",
    inicio: new Date(),
    fin: new Date(),
    tasks: [],
  };

  const [sprint, setSprint] = useState<ISprint>(initialValues);

  const createSprint = async () => {
    setSprint({ ...sprint, id: new Date().toISOString() });
    await createSprintController(sprint);
  };

  return (
    <div className={styles.containerCreateSprintModal}>
      <div className={styles.inputs}>
        <h2>Crear Sprint</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={sprint.nombre}
          onChange={(e) => setSprint({ ...sprint, nombre: e.target.value })}
          className={styles.nombreSprint}
        />
        <input
          type="date"
          placeholder="Fecha inicio"
          value={sprint.inicio.toISOString().split("T")[0]}
          onChange={(e) =>
            setSprint({ ...sprint, inicio: new Date(e.target.value) })
          }
          className={styles.inicioSprint}
        />
        <input
          type="date"
          placeholder="Fecha fin"
          value={sprint.fin.toISOString().split("T")[0]}
          onChange={(e) =>
            setSprint({ ...sprint, fin: new Date(e.target.value) })
          }
          className={styles.finSprint}
        />
        <div className={styles.buttons}>
          <OpenButton onClick={createSprint} />
          <CloseButton
          //onClick={}
          />
        </div>
      </div>
    </div>
  );
};
