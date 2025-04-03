import axios from "axios";
import { ISprint } from "../types/ISprint";
import { ITodoListApp } from "../types/ITodoListApp";
import { API_URL } from "../utils/constantes";

export const putTodoList = async (sprints: ISprint[]) => {
  try {
    const response = await axios.put<ITodoListApp>(API_URL, {
      sprints: sprints,
    })

    return response.data
  } catch(error) {
    console.error("Error al modificar base de datos: ", error)
  }
}