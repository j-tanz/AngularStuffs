import { Injectable } from '@angular/core';

export class Task {

  title: string;
  completed: boolean;

  constructor(title: string, completed: boolean) {
    this.title = title;
    this.completed = completed;
  }

}

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  tasks: Task[] = [new Task("Walk the Dog", false), new Task("Cook Breakfast", false), new Task("Get Dressed", false)];

  constructor() {
  }

  addTask(title: string, completed: boolean) {
    this.tasks.push(new Task(title,completed));
  }

  deleteTask(i: number) {
    console.log(i);
    this.tasks.splice(i, 1);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

}
