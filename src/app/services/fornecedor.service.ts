import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from '../model/fornecedor.model';


const API_URL = 'http://localhost:3000';
const HTTP_OPTIONS = {
  headers: new HttpHeaders (
    {'Content-Type': 'application/json;charset=utf-8'}
  )
};

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private http: HttpClient) { }

  insertFornecedor(fornecedor: Fornecedor): Observable<any> {
    return this.http.post(`${API_URL}/fornecedor`, fornecedor, HTTP_OPTIONS);
  }

  getFornecedor(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${API_URL}/fornecedor/$(id)`);
  }

  getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${API_URL}/fornecedor`);
  }

  updateFornecedor(fornecedor: Fornecedor): Observable<any> {
    return this.http.put(`${API_URL}/fornecedor/${fornecedor.id}`, fornecedor, HTTP_OPTIONS);
  }

  deleteFornecedor(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/fornecedor/${id}`);
  }
}
