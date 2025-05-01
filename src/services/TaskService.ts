import axios from "axios";
import { ITarea } from "../types/ITarea";
import { API_URL } from "../utils/constantes";

export class TaskService {
  async getTareas(): Promise<ITarea[] | undefined> {
    try {
      const response = await axios.get<{ tasks: ITarea[] }>(`${API_URL}/task`);
      return response.data.tasks;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async getTarea(idTask: String): Promise<ITarea | undefined> {
    try {
      const response = await axios.get<{ task: ITarea }>(
        `${API_URL}/task/${idTask}}]`
      );
      return response.data.task;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async createTarea(nuevaTarea: ITarea): Promise<ITarea | undefined> {
    try {
      const response = await axios.post<{ task: ITarea }>(
        `${API_URL}/task`,
        nuevaTarea
      );
      return response.data.task;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async updateTarea(
    idTask: String,
    updatedTask: ITarea
  ): Promise<ITarea | undefined> {
    try {
      const response = await axios.put<{ task: ITarea }>(
        `${API_URL}/task/${idTask}`,
        updatedTask
      );
      return response.data.task;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async deleteTarea(idTask: String): Promise<ITarea | undefined> {
    try {
      const response = await axios.delete<{ task: ITarea }>(
        `${API_URL}/task/${idTask}`
      );
      return response.data.task;
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}
