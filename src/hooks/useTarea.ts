import { useShallow } from "zustand/shallow";
import { ITarea } from "../types/ITarea";
import Swal from "sweetalert2";
import { taskStore } from "../store/taskStore";
import { createTaskToBacklog, deleteTaskBacklog, getBacklogController, postTaskBacklogToSprint, updateTaskBacklogController } from "../data/backlogController";

const useTarea = () => {
  const {
    tareas,
    setArrayTareas,
    agregarNuevaTarea,
    eliminarTarea,
    editarTarea,
  } = taskStore(
    useShallow((state) => ({
      tareas: state.tareas,
      setArrayTareas: state.setArrayTareas,
      agregarNuevaTarea: state.agregarNuevaTarea,
      eliminarTarea: state.eliminarTarea,
      editarTarea: state.editarTarea,
    }))
  );
  const getTareas = async () => {
    const data = await getBacklogController();
    console.log("Tareas: " + data);
    if (data) setArrayTareas(data);
  };

  const createTarea = async (nuevaTarea: ITarea) => {
    agregarNuevaTarea(nuevaTarea);
    try {
      await createTaskToBacklog(nuevaTarea);
      Swal.fire("Éxito", "Tarea creada correctamente", "success");
    } catch (error) {
      eliminarTarea(nuevaTarea.id!);
      console.log("Error al crear tarea");
    }
  };

  const updateTarea = async (tareaActualizada: ITarea) => {
    const estadoPrevio = tareas.find((el) => el.id === tareaActualizada.id);
    editarTarea(tareaActualizada);
    try {
      await updateTaskBacklogController(tareaActualizada);
      Swal.fire("Éxito", "Tarea actualizada correctamente", "success");
    } catch (err) {
      if (estadoPrevio) {
        editarTarea(estadoPrevio);
      }
      console.log("Error al crear tarea");
    }
  };

  const deleteTarea = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el.id === idTarea);
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
      await deleteTaskBacklog(idTarea);
      eliminarTarea(idTarea);
      Swal.fire("Eliminado", "Tarea eliminada correctamente", "success");
    } catch (error) {
      if (estadoPrevio) createTarea(estadoPrevio);
      console.log("Error al eliminar tarea");
    }
  };

  const taskToSprint = async (tarea: ITarea, idSprint: string) => {
    const estadoPrevio = tareas.find((el) => el.id === tarea.id);
    const confirm = await Swal.fire({
      title: "¿Desea enviar la tarea al sprint?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, enviar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      await postTaskBacklogToSprint(tarea, idSprint)
      eliminarTarea(tarea.id);
      Swal.fire("Eliminado", "Tarea enviada correctamente", "success");
    } catch (error) {
      if (estadoPrevio) createTarea(estadoPrevio);
      console.log("Error al enviar tarea");
    }
  }

  return {
    getTareas,
    createTarea,
    updateTarea,
    deleteTarea,
    taskToSprint,
    tareas,
  };
};

export default useTarea;
