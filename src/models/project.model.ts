import { Status } from "./enums";

export interface Project {
  id?: string;
  numProjeto: string;
  dataInicio: string;
  nomeProjeto: string;
  areas: string;
  responsavel: string;
  escopo: string;
  status: Status;
  tags: string[];
  createdBy: string;
  createdAt: any;
  updatedAt: any;
  ativo: boolean;
}
