import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Folder } from '../interfaces/Folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private readonly baseUrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }

  getDisks() {
    return this.http.get<Folder[]>(this.baseUrl + 'folders')
  }

  getFolder(fullPath: string) {
    return this.http.get<Folder[]>(this.baseUrl + 'folders', {params: new HttpParams().set('path', fullPath)})
  }
}
