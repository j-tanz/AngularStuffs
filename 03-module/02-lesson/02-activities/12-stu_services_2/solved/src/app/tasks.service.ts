import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: string[] = ["Walk the Dog", "Cook Breakfast", "Get Dressed"];

  constructor() {
  }

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(i: number) {
    console.log(i);
    this.tasks.splice(i, 1);
  }

  getTasks(): string[] {
    return this.tasks;
  }

}
