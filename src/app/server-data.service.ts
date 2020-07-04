import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServerDataService {
  url: string = 'http://localhost/TaskManagerAPI/api/quotes';

  constructor(private http: HttpClient) {}
  getAllQuotes() {
    return this.http.get(this.url);
  }

  verifyUser() {}

  addUser() {}

  addQuote() {}

  editQuote() {}

  deleteQuote() {}
}
