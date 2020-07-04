import { Component, OnInit } from '@angular/core';
import { ServerDataService } from '../server-data.service';
import { MatTableDataSource } from '@angular/material/table';

export class Task {
  contact: string;
  dueDate: string;
  ID: number;
  quoteType: string;
  taskDesc: string;
  taskType: string;
}

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
})
export class TaskTableComponent implements OnInit {
  displayedColumns: string[] = [
    'Quote Type',
    'QuoteID',
    'Contact',
    'Task',
    'Due Date',
    'Task Type',
  ];
  dataSource: Task[] = [];
  allTasks;
  constructor(private DataService: ServerDataService) {
    DataService.getAllQuotes().subscribe(
      (data) => {
        for (const key in data) {
          let quote = new Task();
          quote.ID = data[key].ID;
          quote.contact = data[key].Contact;
          quote.dueDate = new Date(data[key].DueDate).toDateString();
          quote.quoteType = data[key].QuoteType;
          quote.taskDesc = data[key].TaskDescription;
          quote.taskType = data[key].TaskType;
          this.dataSource.push(quote);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('returned data: ');
        console.log(this.dataSource);
        this.allTasks = new MatTableDataSource(this.dataSource);
      }
    );
  }

  ngOnInit(): void {}
}
