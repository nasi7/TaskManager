import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServerDataService } from '../server-data.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { FormGroup } from '@angular/forms';

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
    'action',
  ];
  dataSource: Task[];
  allTasks: any;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private DataService: ServerDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource = [];
    this.getDataFromDB();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allTasks.filter = filterValue.trim().toLowerCase();
  }

  getDataFromDB() {
    this.dataSource = [];
    this.DataService.getAllQuotes().subscribe(
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

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '500px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Delete') {
        this.DataService.deleteQuote(result.data.ID).subscribe(
          (data) => console.log(data),
          (error) => console.log(error),
          () => this.getDataFromDB()
        );
      } else {
        this.getDataFromDB();
      }
    });
  }
}
