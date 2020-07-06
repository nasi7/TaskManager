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

  addQuote(
    quoteType: string,
    contact: string,
    taskDesc: string,
    dueDate: Date,
    taskType: string
  ) {
    debugger;
    return this.http.post(this.url, {
      QuoteType: quoteType,
      Contact: contact,
      TaskDescription: taskDesc,
      DueDate: dueDate,
      TaskType: taskType,
    });
  }

  editQuote() {}

  deleteQuote() {}
}
