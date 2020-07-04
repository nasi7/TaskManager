import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerDataService } from '../server-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
    'quoteType',
    'ID',
    'contact',
    'taskDesc',
    'dueDate',
    'taskType',
  ];
  dataSource: Task[] = [];
  allTasks: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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
        this.allTasks.paginator = this.paginator;
        this.allTasks.sort = this.sort;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allTasks.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {}
}
