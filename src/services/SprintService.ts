import axios from "axios";
import { ISprint } from "../types/ISprint";
import { API_URL } from "../utils/constantes";

export class SprintService {
  async getSprints(): Promise<ISprint[] | undefined> {
    try {
      const response = await axios.get(`${API_URL}/sprint`);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async getSprint(id: String): Promise<ISprint | undefined> {
    try {
      const response = await axios.get(`${API_URL}/sprint/${id}`);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async createSprint(nuevoSprint: ISprint): Promise<ISprint | undefined> {
    try {
      const response = await axios.post(`${API_URL}/sprint`, nuevoSprint);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async updateSprint(sprintActualizado: ISprint): Promise<ISprint | undefined> {
    try {
      const response = await axios.put(
        `${API_URL}/sprint/${sprintActualizado.id}`,
        sprintActualizado
      );
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async deleteSprint(idSprint: String): Promise<ISprint | undefined> {
    try {
      const response = await axios.delete(`${API_URL}/sprint/${idSprint}`);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async createTaskToSprint(
    idSprint: String,
    idTarea: String
  ): Promise<ISprint | undefined> {
    try {
      const response = await axios.put(
        `${API_URL}/sprint/${idSprint}/addTask/${idTarea}`
      );
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async taskToBacklog(
    idSprint: String,
    idTarea: String
  ): Promise<ISprint | undefined> {
    try {
      const response = await axios.put(
        `${API_URL}/sprint/${idSprint}/taskToBacklog/${idTarea}`
      );

      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
}
