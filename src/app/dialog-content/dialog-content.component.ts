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
  AddTaskForm: FormGroup;
  task: any;
  action: string;
  confirmButton = 'accent';

  constructor(
    private DataService: ServerDataService,
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.task = { ...data };
    this.action = this.task.action;
    if (this.action == 'Delete') {
      this.confirmButton = 'warn';
    }
  }

  ngOnInit(): void {
    this.AddTaskForm = new FormGroup({
      quoteType: new FormControl(this.task.quoteType, Validators.required),
      taskType: new FormControl(this.task.taskType, Validators.required),
      contact: new FormControl(this.task.contact, Validators.required),
      dueDate: new FormControl(this.task.dueDate, Validators.required),
      taskDescription: new FormControl(this.task.taskDesc, Validators.required),
    });
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.task });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  onSubmit() {
    let tempTask: Task;
    tempTask.quoteType = this.AddTaskForm.controls.quoteType.value;
    tempTask.contact = this.AddTaskForm.controls.contact.value;
    tempTask.taskDesc = this.AddTaskForm.controls.taskDescription.value;
    tempTask.dueDate = this.AddTaskForm.controls.dueDate.value;
    tempTask.taskType = this.AddTaskForm.controls.taskType.value;
    let ID: string = this.task.ID.toString();

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

    // this.DataService.addQuote(
    //   quoteType,
    //   contact,
    //   taskDesc,
    //   dueDate,
    //   taskType
    // ).subscribe(
    //   (val) => {
    //     console.log('POST call successful value returned in body', val);
    //   },
    //   (response) => {
    //     console.log('POST call in error', response);
    //   },
    //   () => {
    //     console.log('The POST observable is now completed.');
    //   }
    // );
  }
}
