import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ServerDataService } from '../server-data.service';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css'],
})
export class DialogContentComponent implements OnInit {
  AddTaskForm: FormGroup;

  constructor(private DataService: ServerDataService) {}

  ngOnInit(): void {
    this.AddTaskForm = new FormGroup({
      quoteType: new FormControl(null, Validators.required),
      taskType: new FormControl(null, Validators.required),
      contact: new FormControl(null, Validators.required),
      dueDate: new FormControl(null, Validators.required),
      taskDescription: new FormControl(null),
    });
  }
  handleSubmit() {
    var quoteType = this.AddTaskForm.controls.quoteType.value;
    var contact = this.AddTaskForm.controls.contact.value;
    var taskDesc = this.AddTaskForm.controls.taskDescription.value;
    var dueDate = this.AddTaskForm.controls.dueDate.value;
    var taskType = this.AddTaskForm.controls.taskType.value;

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
