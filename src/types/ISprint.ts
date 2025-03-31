import { ITarea } from "./ITarea";

export interface ISprint {
  nombre: string,
  inicio: Date,
  fin: Date,
  tasks: ITarea[]
}