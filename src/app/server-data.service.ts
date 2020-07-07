import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task } from './task-table/task-table.component';

@Injectable({
  providedIn: 'root',
})
export class ServerDataService {
  APIurl: string = 'http://localhost/TaskManagerAPI/api/quotes';
  accessUrl: string = 'http://localhost/TaskManagerAPI/token';
  signupUrl: string = 'http://localhost/TaskManagerAPI/api/account/register';

  constructor(private http: HttpClient) {}
  getAllQuotes() {
    return this.http.get(this.APIurl);
  }

  verifyUser(username: string, password: string) {
    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('Username', username);
    body.set('Password', password);

    return this.http.post(this.accessUrl, body.toString());
  }

  addUser(email, password, confirmPassword) {
    // let body = new URLSearchParams();
    // body.set('Email', email);
    // body.set('Password', password);
    // body.set('ConfirmPassword', confirmPassword);
    // debugger;
    let body = JSON.stringify({
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword,
    });
    return this.http.post(this.signupUrl, body);
  }

  addQuote(
    quoteType: string,
    contact: string,
    taskDesc: string,
    dueDate: Date,
    taskType: string
  ) {
    return this.http.post(
      this.APIurl,
      JSON.stringify({
        QuoteType: quoteType,
        Contact: contact,
        TaskDescription: taskDesc,
        DueDate: dueDate,
        TaskType: taskType,
      })
    );
  }

  editQuote(ID, task: Task) {
    let IDparams: HttpParams;
    IDparams.append('id', ID);
    let body = JSON.stringify({
      QuoteType: task.quoteType,
      Contact: task.contact,
      TaskDescription: task.taskDesc,
      DueDate: task.dueDate,
      TaskType: task.taskType,
    });
    return this.http.put(this.APIurl, body, { params: IDparams });
  }

  deleteQuote() {}
}
