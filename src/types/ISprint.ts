import { ITarea } from "./ITarea";

export interface ISprint {
  id?: string,
  nombre: string,
  inicio: Date,
  fin: Date,
  tasks: ITarea[]
}