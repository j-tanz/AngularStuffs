import { Component, OnInit } from '@angular/core';
import { TasksService, Task } from '../tasks.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tasks: Task[] = [];
  displayList = true;

  taskIdsBeingEdited = {};

  taskBeingDisplayed: Task;

  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    this.getTasks();
  }

  onToggleDisplay() {
    this.displayList = !this.displayList;
  }

  onStartEditTask(task: Task) {
    this.taskIdsBeingEdited[task.taskId] = true;
  }

  onSaveEditTask(task: Task) {
    this.taskIdsBeingEdited[task.taskId] = false;
  }

  onDeleteTask(task: Task) {
    this.tasksService.deleteTask(task.taskId)
    this.getTasks(); //we now need to update the component's task data by refreshing it from the tasksService
  }

  getTasks() {
    // adding the setTimeout will force Angular's change detection to occur. Otherwise, the view may not update
    setTimeout(() => {
      this.tasks = this.tasksService.getTasks();
    }, 0);
  }

  onViewTaskDetails(task: Task) {
    this.taskBeingDisplayed = task;
  }

}
