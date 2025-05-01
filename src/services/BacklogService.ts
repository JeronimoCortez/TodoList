import axios from "axios";
import { ITarea } from "../types/ITarea";
import { API_URL } from "../utils/constantes";

export class BacklogService {
  async getTareasBacklog(): Promise<ITarea[] | undefined> {
    try {
      const response = await axios.get<{ tasks: ITarea[] }>(
        `${API_URL}/backlog`
      );
      return response.data.tasks;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async postBacklog(): Promise<ITarea[] | undefined> {
    try {
      const response = await axios.post<{ tasks: ITarea[] }>(
        `${API_URL}/backlog`
      );
      return response.data.tasks;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async addTaskBacklog(idTask: String): Promise<ITarea | undefined> {
    try {
      const response = await axios.put<{ task: ITarea }>(
        `${API_URL}/backlog/addTask/${idTask}`
      );
      return response.data.task;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async taskToSprint(
    idTask: String,
    idSprint: String
  ): Promise<ITarea | undefined> {
    try {
      const response = await axios.put(
        `${API_URL}/backlog/taskToSprint/${idTask}/${idSprint}`
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}
