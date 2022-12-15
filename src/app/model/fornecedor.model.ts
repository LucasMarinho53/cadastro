import { Endereco } from "./endereco.model";

export interface Fornecedor{
  id:number;
  nome:string;
  cnpj:number;
  contato:string;
  numero:number;
  endereco:Endereco
}
