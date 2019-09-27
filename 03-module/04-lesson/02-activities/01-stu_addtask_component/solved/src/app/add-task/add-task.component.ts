import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
  }

}
