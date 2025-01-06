import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { GetWordCollectionsResponse, TypicalResponse, Word } from '../models/lirary';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = "http://localhost:5199/"
  private libraryControllerUrl = this.apiUrl + 'api/Library/'
  constructor(private http: HttpClient, private auth: AuthService) { }

  getWordCollections(): Observable<GetWordCollectionsResponse> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<GetWordCollectionsResponse>(this.libraryControllerUrl + 'collections', { headers });
  }

  deleteWord(collectionId: string, wordId: string) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http.delete<TypicalResponse>(this.libraryControllerUrl + `words?collectionId=${collectionId}&wordId=${wordId}`, { headers }).subscribe({
      error: (err) => {
        console.error(err);
      }
    });
  }

  addWord(collectionId: string, text: string, description: string | null, translate: string | null) {
    const token = this.auth.getToken();

    const formData = new FormData();
    formData.append('Text', text);
    if (description !== null) {
      formData.append('Description', description)
    }
    if (translate !== null) {
      formData.append('Translate', translate);
    };
    const headers = new HttpHeaders({
      Authorization: `Bearer: ${token}`,
    });
    console.log(`Authorization: Bearer: ${token}`);
    console.log(this.libraryControllerUrl + `words?collectionId=${collectionId}`);


    this.http.post<TypicalResponse>(this.libraryControllerUrl + `words?collectionId=${collectionId}`, formData, { headers }).subscribe({
      error: (err) => {
        console.log(err)
      }
    })
  }

  async editWord(
    collectionId: string,
    wordId: string,
    text: string | null = null,
    translate: string | null = null,
    description: string | null = null
  ): Promise<boolean> {
    let toResposne: boolean = true;
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    let url = `words?collectionId=${collectionId}&wordId=${wordId}`;
    if (text === null && translate === null && description === null) return false;
    if (text !== null) url += `&text=${text}`;
    if (translate !== null) url += `&translate=${translate}`;
    if (description !== null) url += `&description=${description}`;

    try {
      const response = await lastValueFrom(
        this.http.put<TypicalResponse>(
          `${this.libraryControllerUrl}${url}`,
          {},
          { headers }
        )
      );

      toResposne = true;
    } catch (error) {
      console.error('Error in editWord:', error);
      toResposne = false;
    }

    return toResposne;
  }

  replaceExamples(collectionId: string, wordId: string, examples: { text: string, translate: string }) {
    const url: string = this.libraryControllerUrl + `examples/many?collectionId=${collectionId}&wordId=${wordId}`
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    })
    try {
      this.http.post(url, examples, { headers })
    } catch (error) {
      console.error(error);
    }
  }

  createWordsCollection(language: string, title: string) {
    const url: string = this.libraryControllerUrl + 'collections';
    const token = this.auth.getToken();
    const formData = new FormData();
    formData.append('Language', language);
    formData.append('Title', title);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http.post(url, formData, { headers }).subscribe({
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteWordsCollection(collectionId: string) {
    const url: string = this.libraryControllerUrl + `collections?collectionId=${collectionId}`;
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    this.http.delete(url, { headers }).subscribe({
      error: (err) => {
        console.error(err);
      }
    });
  }
}
