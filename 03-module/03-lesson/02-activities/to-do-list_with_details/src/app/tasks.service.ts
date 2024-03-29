import { Injectable } from '@angular/core';
import * as uuid from 'uuid';


export class Task {
  constructor(title: string, completed: boolean) {
    this.title = title;
    this.completed = completed;

    this.taskId = uuid.v4(); //normally this would be generated by the server, but we'll generate it for example now
  }
  taskId: string;
  title: string;
  completed: boolean;

  detailText?: string;
}
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[] = [
    new Task('Walk the dog', false),
    new Task('Buy dog food', false)
  ]

  constructor() {
    this.tasks.push(new Task('Get some coding done!', true));
  }

  addTask(title: string, completed: boolean) {
    const newTask = new Task(title, completed);
    this.tasks.push(newTask);
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => {
      return task.taskId !== taskId
    })
  }

  getTasks(): Task[] {
    return this.tasks;
  }

}
