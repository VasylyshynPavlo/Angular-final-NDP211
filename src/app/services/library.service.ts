import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getWordCollectionsResponse, Word, WordsCollection, WordsCollections } from '../models/lirary';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CustomResponse } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = "http://localhost:5199/"
  private libraryControllerUrl = this.apiUrl + 'api/Library/'
  constructor(private http: HttpClient, private auth: AuthService) { }

  getWordCollections(): Observable<getWordCollectionsResponse> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<getWordCollectionsResponse>(this.libraryControllerUrl + 'collections', { headers });
  }
  
}
