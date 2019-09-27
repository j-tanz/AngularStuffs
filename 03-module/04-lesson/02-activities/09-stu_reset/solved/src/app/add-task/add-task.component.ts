import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  taskForm = this.fb.group({
    title: [''],
    detailText: ['']
})

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService
    ) { }

  ngOnInit() {
    console.log('taskForm', this.taskForm)
  }

  onSubmit() {
    const title = this.taskForm.value.title;
    this.tasksService.addTask(title, false)
  }

  onPatchSampleText() {
    // you could also patch title: "text" onto this Object, but the intent with these functions is to show that setValue overwrites, while patchvalue just updates the form
    this.taskForm.patchValue({
      detailText: "Sample detail text!\nHere's a new line."
    })
  }

  onSetSampleText() {
    // you could also patch title: "text" onto this Object, but the intent with these functions is to show that setValue must take in *all* of the form controls to overwrite the whole form.
    this.taskForm.setValue({
      title: "New setValue() title",
      detailText: "Sample .setValue() text! Notice that setValue() overwrites the whole form, requiring every FormControl to be set to a value."
    })
  }
  onResetForm() {
    this.taskForm.reset();
  }
}
