export interface Project {
  id?: string;
  numProjeto: string;
  dataInicio: string;
  nomeProjeto: string;
  areas: string;
  responsavel: string;
  escopo: string;
  status: 'iniciar' | 'andamento' | 'concluido' | 'Em espera' | 'Cancelado';
  tags: string[];
  createdBy: string;
  createdAt: any;
  updatedAt: any;
  ativo: boolean;
}
