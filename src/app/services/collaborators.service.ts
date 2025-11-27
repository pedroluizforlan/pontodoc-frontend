import { HttpClient} from '@angular/common/http';
import { Injectable, inject  } from '@angular/core';
import { environment } from '../../environments/environments.local';
import { Observable } from 'rxjs';
import { Collaborator } from '../models/collaborator.model';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {
  private http = inject(HttpClient);

  private readonly API_URL = `${environment.apiUrl}/collaborator`;

  findAll(): Observable<Collaborator[]> {
    return this.http.get<Collaborator[]>(this.API_URL);
  }

  findById(id: number): Observable<Collaborator> {
    return this.http.get<Collaborator>(`${this.API_URL}/${id}`);
  }

  create(collaborator: Collaborator): Observable<Collaborator> {
    return this.http.post<Collaborator>(this.API_URL, collaborator);
  }

  update(id: number, collaborator: Collaborator): Observable<Collaborator> {
    return this.http.put<Collaborator>(`${this.API_URL}/${id}`, collaborator);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
