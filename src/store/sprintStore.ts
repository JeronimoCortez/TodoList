import { create } from "zustand";
import { ISprint } from "../types/ISprint";

interface ISprintStore {
  sprints: ISprint[];
  sprintActivo: ISprint|null;
  setSprintActivo: (sprintActivo: ISprint | null) => void;
  setArraySprint: (arraySprint: ISprint[]) => void;
  agregarNuevoSprint: (nuevoSprint: ISprint) => void;
  editarSprint: (sprintEditado: ISprint) => void;
  eliminarSprint: (idSprint: String) => void;
}

export const sprintStore = create<ISprintStore> ((set) => ({
  sprints: [],
  sprintActivo: null,
  setArraySprint: (arraySprint) => set(() => ({sprints: arraySprint})),
  agregarNuevoSprint: (nuevoSprint) => set((state) => ({sprints: [...state.sprints, nuevoSprint]})),
  editarSprint: (sprintActualizado) => set((state) => {
    const arraySprint = state.sprints.map((sprint) => sprint.id === sprintActualizado.id ? {...sprint, ...sprintActualizado} : sprint)
    return {sprints: arraySprint}
  }),
  eliminarSprint: (idSprint) => set((state) => {
    const arraySprint = state.sprints.filter((sprint) => sprint.id !== idSprint)
    return {sprints: arraySprint}
  }),
  setSprintActivo: (sprintActivoIn) => set(() => ({sprintActivo: sprintActivoIn}))
}))