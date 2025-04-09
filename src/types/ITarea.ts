import { estadosTareas } from "../enum/estadosTareas";

export interface ITarea {
  id: string;
  titulo: string;
  descripcion: string;
  fechaLimite: Date;
  estado: estadosTareas;
}
