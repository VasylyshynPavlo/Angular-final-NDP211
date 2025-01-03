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

  deleteWord(collectionId: string, wordId: string): any {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http.delete<TypicalResponse>(this.libraryControllerUrl + `words?collectionId=${collectionId}&wordId=${wordId}`, { headers }).subscribe({
      next: (response) => {
        if (response.code === 200) {
          return true;
        }
        else {
          return false;
        }
      },
      error: (err) => {
        return false;
      }
    });
  }

  addWord(collectionId: string, word: Word): any {
    const token = this.auth.getToken();
    const formData = new FormData();
    formData.append('Text', word.text);
    if (word.description !== null) {
      formData.append('Description', word.description)
    }
    if (word.translate !== null) {
      formData.append('Translate', word.translate);
    };
    const header = new HttpHeaders({
      Authorization: `Bearer: ${token}`,
    });
    this.http.post<TypicalResponse>(this.libraryControllerUrl + `words?collectionId=${collectionId}`, { header }).subscribe({
      next: (response) => {
        if (response.code === 200) {
          return true;
        }
        else {
          return false;
        }
      },
      error: (err) => {
        return false;
      }
    })
  }
  // words?collectionId=1&wordId=1&text=1&translate=1&description=1
  async editWord(
    collectionId: string,
    wordId: string,
    text: string | null = null,
    translate: string | null = null,
    description: string | null = null
  ): Promise<boolean> {
    let resposne: boolean = true;
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
        this.http.put<TypicalResponse>(this.libraryControllerUrl + url, { headers })
      );

      if (response.code === 200) {
        resposne = true;
      } else {
        console.error('Something went wrong!');
        resposne = true;
      }
    } catch (error) {
      console.error('Error in editWord:', error);
      resposne = false;
    }
    return resposne;
  }

}
