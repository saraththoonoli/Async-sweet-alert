import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteItem(userId: number) {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
