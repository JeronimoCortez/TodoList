import axios from "axios";
import { ISprint } from "../types/ISprint";
import { ITodoListApp } from "../types/ITodoListApp";
import { API_URL } from "../utils/constantes";
import { ITarea } from "../types/ITarea";

export const putTodoList = async (sprints: ISprint[]) => {
  try {
    const response = await axios.put<ITodoListApp>(`${API_URL}/sprintList`, {
      sprints: sprints,
    })

    return response.data
  } catch(error) {
    console.error("Error al modificar base de datos: ", error)
  }
}

export const putBacklog = async (tasks: ITarea[]) => {
  try {
    const response = await axios.put<ITodoListApp>(`${API_URL}/backlog`, {
      tasks: tasks,
    })

    return response.data
  } catch(error) {
    console.error("Error al modificar base de datos: ", error)
  }
}