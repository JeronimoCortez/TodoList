import { useShallow } from "zustand/shallow";
import { sprintStore } from "../store/sprintStore";
import {
  createSprintController,
  deleteSprintController,
  getSprintsController,
  updateSprintController,
} from "../data/todoListController";
import { ISprint } from "../types/ISprint";
import Swal from "sweetalert2";
import { ITarea } from "../types/ITarea";
import {
  createTaskToSprint,
  deleteTaskSprint,
  postTaskSprintToBacklog,
  updateTaskBySprintController,
} from "../data/backlogController";

const useSprint = () => {
  const {
    sprints,
    setSprintActivo,
    setArraySprint,
    agregarNuevoSprint,
    editarSprint,
    eliminarSprint,
  } = sprintStore(
    useShallow((state) => ({
      sprints: state.sprints,
      setSprintActivo: state.setSprintActivo,
      setArraySprint: state.setArraySprint,
      agregarNuevoSprint: state.agregarNuevoSprint,
      editarSprint: state.editarSprint,
      eliminarSprint: state.eliminarSprint,
    }))
  );

  const getSprints = async () => {
    const data = await getSprintsController();
    console.log("Data: ", data);
    if (data) setArraySprint(data);
  };

  const createSprint = async (nuevoSprint: ISprint) => {
    agregarNuevoSprint(nuevoSprint);

    try {
      await createSprintController(nuevoSprint);
      Swal.fire("Éxito", "Sprint creado correctamente", "success");
    } catch (error) {
      eliminarSprint(nuevoSprint.id!);
      console.log("Error al crear sprint: ", error);
    }
  };

  const updateSprint = async (sprintActualizado: ISprint) => {
    const estadoPrevio = sprints.find((el) => el.id === sprintActualizado.id);
    editarSprint(sprintActualizado);

    try {
      await updateSprintController(sprintActualizado);
      Swal.fire("Éxito", "Sprint actualizado correctamente", "success");
    } catch (error) {
      if (estadoPrevio) {
        editarSprint(sprintActualizado);
      }
      console.log("Error al actualizar sprint: ", error);
    }
  };

  const deleteSprint = async (idSprint: string) => {
    const estadoPrevio = sprints.find((el) => el.id === idSprint);
    const confirm = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;

    try {
      await deleteSprintController(idSprint);
      eliminarSprint(idSprint);
      Swal.fire("Eliminado", "Sprint eliminado correctamente", "success");
    } catch (error) {
      if (estadoPrevio) createSprint(estadoPrevio);
      console.log("Error al eliminar sprint");
    }
  };

  const createTaskSprint = async (tarea: ITarea, idSprint: string) => {
    try {
      const sprintDb = sprints.find((sprint) => sprint.id === idSprint);
      if (sprintDb) {
        sprintDb.tasks.push(tarea);
        console.log(sprintDb.tasks);
        editarSprint(sprintDb);
        setSprintActivo(sprintDb);
        await createTaskToSprint(tarea, idSprint);
      }
      Swal.fire("Éxito", "Tarea creada correctamente", "success");
    } catch (error) {
      console.log("Error al crear tarea: ", error);
    }
  };

  const updateTaskSprint = async (idSprint: string, tareaEditada: ITarea) => {
    try {
      const sprint = sprints.find((s) => s.id === idSprint);
      if (!sprint) return;
      const tareasActualizadas = sprint.tasks.map((tarea) =>
        tarea.id === tareaEditada.id ? { ...tarea, ...tareaEditada } : tarea
      );
      const sprintActualizado = { ...sprint, tasks: tareasActualizadas };
      setSprintActivo(sprintActualizado);
      editarSprint(sprintActualizado);
      await updateTaskBySprintController(idSprint, tareaEditada);

      Swal.fire("Éxito", "Tarea actualizada correctamente", "success");
    } catch (error) {
      console.error("Error al editar tarea: ", error);
    }
  };

  const deleteTaskToSprint = async (idTarea: string, idSprint: string) => {
    const confirm = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      console.log(idSprint);
      const sprint = sprints.find((s) => s.id === idSprint);
      console.log(sprint);
      if (!sprint) return;
      const tareasActualizadas = sprint.tasks.filter(
        (tarea) => tarea.id !== idTarea
      );
      const sprintActualizado = { ...sprint, tasks: tareasActualizadas };
      setSprintActivo(sprintActualizado);
      editarSprint(sprintActualizado);
      await deleteTaskSprint(idTarea, idSprint);

      Swal.fire("Éxito", "Tarea eliminada correctamente", "success");
    } catch (error) {
      console.error("Error al eliminar tarea: ", error);
    }
  };

  const taskToBacklog = async (tarea: ITarea, idSprint: string) => {
    const estadoPrevio = sprints.find((el) => el.id === idSprint);
    const confirm = await Swal.fire({
      title: "¿Desea enviar la tarea al backlog?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, enviar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      if (estadoPrevio) {
        const sprintActualizado = {
          ...estadoPrevio,
          tasks: estadoPrevio?.tasks.filter((task) => task.id !== tarea.id),
        };
        setSprintActivo(sprintActualizado);

        editarSprint(sprintActualizado);
      }

      await postTaskSprintToBacklog(tarea, idSprint);

      Swal.fire("Eliminado", "Tarea enviada correctamente", "success");
    } catch (error) {
      if (estadoPrevio) createSprint(estadoPrevio);
      console.log("Error al enviar tarea");
    }
  };

  return {
    getSprints,
    createSprint,
    updateSprint,
    deleteSprint,
    createTaskSprint,
    updateTaskSprint,
    deleteTaskToSprint,
    taskToBacklog,
    sprints,
  };
};

export default useSprint;
