import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurriculoService {
  private apiUrl = 'http://localhost:5000/api/curriculos';

  constructor(private http: HttpClient) {}

  getCurriculos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCurriculo(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addCurriculo(curriculo: any): Observable<any> {
    return this.http.post(this.apiUrl, curriculo);
  }

  updateCurriculo(curriculo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${curriculo.id}`, curriculo);
  }

  deleteCurriculo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
