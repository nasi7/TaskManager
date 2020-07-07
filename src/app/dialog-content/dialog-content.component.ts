import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ServerDataService } from '../server-data.service';
import { Task } from '../task-table/task-table.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css'],
})
export class DialogContentComponent implements OnInit {
  TaskForm: FormGroup;
  task: any;
  action: string;

  constructor(
    private DataService: ServerDataService,
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.task = { ...data };
    this.action = this.task.action;
  }

  ngOnInit(): void {
    if (this.action == 'Add') {
      this.TaskForm = new FormGroup({
        quoteType: new FormControl(null, Validators.required),
        taskType: new FormControl(null, Validators.required),
        contact: new FormControl(null, Validators.required),
        dueDate: new FormControl(null, Validators.required),
        taskDescription: new FormControl(null, Validators.required),
      });
    } else {
      this.TaskForm = new FormGroup({
        quoteType: new FormControl(this.task.quoteType, Validators.required),
        taskType: new FormControl(this.task.taskType, Validators.required),
        contact: new FormControl(this.task.contact, Validators.required),
        dueDate: new FormControl(this.task.dueDate, Validators.required),
        taskDescription: new FormControl(
          this.task.taskDesc,
          Validators.required
        ),
      });
    }
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.task });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  onEditSubmit() {
    let tempTask = new Task();
    tempTask.quoteType = this.TaskForm.controls.quoteType.value;
    tempTask.contact = this.TaskForm.controls.contact.value;
    tempTask.taskDesc = this.TaskForm.controls.taskDescription.value;
    tempTask.dueDate = this.TaskForm.controls.dueDate.value;
    tempTask.taskType = this.TaskForm.controls.taskType.value;
    let ID: number = this.task.ID;

    this.DataService.editQuote(ID, tempTask).subscribe(
      (val) => {
        console.log('PUT call successful value returned in body', val);
      },
      (response) => {
        console.log('PUT call in error', response);
      },
      () => {
        console.log('The PUT observable is now completed.');
      }
    );
  }

  onAddSubmit() {
    let quoteType = this.TaskForm.controls.quoteType.value;
    let contact = this.TaskForm.controls.contact.value;
    let taskDesc = this.TaskForm.controls.taskDescription.value;
    let dueDate = this.TaskForm.controls.dueDate.value;
    let taskType = this.TaskForm.controls.taskType.value;

    this.DataService.addQuote(
      quoteType,
      contact,
      taskDesc,
      dueDate,
      taskType
    ).subscribe(
      (val) => {
        console.log('POST call successful value returned in body', val);
      },
      (response) => {
        console.log('POST call in error', response);
      },
      () => {
        console.log('The POST observable is now completed.');
      }
    );
  }
}
