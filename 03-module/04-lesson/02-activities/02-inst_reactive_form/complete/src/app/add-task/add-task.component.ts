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
}
