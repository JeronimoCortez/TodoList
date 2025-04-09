import axios from "axios";
import { ISprint } from "../types/ISprint";
import { API_URL } from "../utils/constantes";
import { putTodoList } from "../http/todoList";


export const getSprintsController = async (): Promise<ISprint[] | undefined> => {
  try {
    const response = await axios.get<ISprint[]>(`${API_URL}/sprints`);
    return response.data
  } catch(error) {
    console.error("Error al traer sprints: ", error)
  }
}

export const getSprintByIdController = async (id: string) => {
  try {
    const sprintDb = await getSprintsController();
    if (sprintDb) {
      const sprintForId = sprintDb.find((sprint) => sprint.id === id)
      return sprintForId;
    }
    return null;
  } catch(error) {
    console.error(`Error al traer sprint ${id}: `, error)
  }
}


export const createSprintController = async (sprintNuevo: ISprint) => {
  try{
    const sprintDb = await getSprintsController();
    if (sprintDb) {
      await putTodoList([...sprintDb, sprintNuevo]);
    } else {
      await putTodoList([sprintNuevo])
    }

    return sprintNuevo;
  } catch(error) {  
    console.error("Error al crear sprint: ", error)
  }
}

export const updateSprintController = async (sprintActualizado: ISprint) => {
  
try {
  const sprintDb = await getSprintsController();
  if (sprintDb) {
    const result = sprintDb.map((sprint) => sprint.id === sprintActualizado.id ? {...sprint, ...sprintActualizado} : sprint);
    await putTodoList(result);
  }
  
  return sprintActualizado;
} catch (error) {
  console.error("Error al actualizar sprint: ", error)
}
  
}

export const deleteSprintController = async (id: string) => {
  const sprintDb = await getSprintsController();
try {
  if(sprintDb) {
    const result = sprintDb.filter((sprint) => sprint.id !== id);
    await putTodoList(result);
  }
} catch (error) {
  console.error("Error al eliminar proyecto: ", error)
}
  
}