import { Injectable } from '@angular/core';

export class Task {

  constructor(title: string, completed: boolean, detailText?: string) {
    this.title = title;
    this.completed = completed;
    this.detailText = detailText;
  }

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
  }

  addTask(title: string, completed: boolean, detail? : string) {
    this.tasks.push(new Task(title,completed, detail));
  }

  deleteTask(i: number) {
    console.log(i);
    this.tasks.splice(i, 1);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

}


