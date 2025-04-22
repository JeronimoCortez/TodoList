import axios from "axios"
import { ITarea } from "../types/ITarea"
import { API_URL } from "../utils/constantes"
import { getSprintByIdController, getSprintsController, updateSprintController } from "./todoListController"
import { putBacklog, putTodoList } from "../http/todoList"

export const getBacklogController = async (): Promise<ITarea[] | undefined> => {
  try {
    const response = await axios.get<({tasks: ITarea[]})>(`${API_URL}/backlog`)
    console.log(response.data.tasks)
    return response.data.tasks
  } catch (error) {
    console.error("Error al traer tareas: ", error)
  }
}

export const getTasksBySprintController = async (idSprint: string) => {
  try {
    const response = await getSprintByIdController(idSprint);
    return response?.tasks;
  } catch (error) {
    console.error(`Error al traer tareas del sprint ${idSprint}: ${error}`)
  }
}

export const createTaskToBacklog = async (task: ITarea) => {
  try {
    const taskDb = await getBacklogController();
    if (taskDb) {
      await putBacklog([...taskDb, task]);
    }
    return task;
  } catch (error) {
    console.error("Error al crear tarea: ", error)
  }
}
export const createTaskToSprint = async (task: ITarea, idSprint: string) => {
  try {
    const sprintsDb = await getSprintsController();
    const sprintIndex = sprintsDb?.findIndex((sprint) => sprint.id === idSprint);

    if (sprintIndex === -1 || sprintIndex === undefined || !sprintsDb) {
      console.log("Sprint no encontrado");
      return;
    }

    const sprintActualizado = {
      ...sprintsDb[sprintIndex],
      tasks: [...sprintsDb[sprintIndex].tasks, task],
    };

    await updateSprintController(sprintActualizado);
  } catch (error) {
    console.log("Error al crear tarea: ", error);
  }
};


export const updateTaskBacklogController = async (tareaEditada: ITarea) => {
  try {
    const tasksDb = await getBacklogController();
    if (tasksDb) {
      const result = tasksDb.map((task) => task.id === tareaEditada.id ? {...task, ...tareaEditada} : task);
      await putBacklog(result)
    }
    return tareaEditada;
  } catch (error) {
    console.error("Error al editar tarea: ", error)
  }
}

export const updateTaskBySprintController = async (idSprint: string, tareaEditada: ITarea) => {
  try {
    const sprintDb = await getSprintsController();
    if (sprintDb) {
      const sprintsActualizados = sprintDb.map((sprint) => {
        if (sprint.id === idSprint) {
          const tareasActualizadas = sprint.tasks.map((tarea) =>
            tarea.id === tareaEditada.id ? { ...tarea, ...tareaEditada } : tarea
          );

          return { ...sprint, tasks: tareasActualizadas };
        }

        return sprint;
      });

      await putTodoList(sprintsActualizados);

      return tareaEditada;
    }
    
    return tareaEditada;
  } catch (error) {
    console.log("Error al editar tarea: ", error)
  }
}

export const deleteTaskBacklog = async (idTarea: string) => {
  try {
    const taskDb = await getBacklogController()
    if (taskDb) {
      const result = taskDb.filter((task) => task.id !== idTarea);
    await putBacklog(result);
    }
    
  } catch (error) {
    console.log("Error al eliminar tarea: ", error)
  }
}

export const deleteTaskSprint = async (idTarea: string, idSprint: string) => {
  try {
    const sprintDb = await getSprintsController();
    if (sprintDb) {
      const sprintsActualizados = sprintDb.map((sprint) => {
        if (sprint.id === idSprint) {
          const tareasActualizadas = sprint.tasks.filter((tarea) =>
            tarea.id !== idTarea 
          );

          return { ...sprint, tasks: tareasActualizadas };
        }

        return sprint;
      });

      await putTodoList(sprintsActualizados);
    }

  } catch (error) {
    console.log("Error al eliminar tarea: ", error)
  }
}

export const postTaskSprintToBacklog = async (tarea: ITarea, idSprint: string) => {
  try {
    const taskDb = await getBacklogController();
    if (taskDb) {
      await putBacklog([...taskDb, tarea])
      deleteTaskSprint(tarea.id, idSprint);
    }
    return tarea;
  } catch (error) {
    console.log("Error al enviar tarea al backlog: ", error);
  }
}

export const postTaskBacklogToSprint = async (tarea: ITarea, idSprint: string) => {
  try {
    const sprintDb = await getSprintsController();
    if (sprintDb) {
      const result = sprintDb.map((sprint) => {
        if (sprint.id === idSprint) {
          sprint.tasks = ([...sprint.tasks, tarea])
        }
        return sprint;
      })
      await putTodoList(result);
      deleteTaskBacklog(tarea.id)
      return tarea;
    }
  } catch (error) {
    console.log("Error al mover tarea al sprint: ", error)
  }
}