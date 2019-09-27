import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  newTaskText: string = "";
  tasks: string[] = ["Walk the Dog", "Cook Breakfast", "Get Dressed"];
  displayList = true;

  imgUrl: string = "https://www.roastycoffee.com/wp-content/uploads/caffeine-coffee.jpg";

  taskIdsBeingEdited = {};

  constructor() {}

  ngOnInit() {
  }

  onToggleDisplay() {
    this.displayList = !this.displayList;
  }

  onDeleteTask(i: number) {
    this.tasks.splice(i,1);
  }

  onCreateNewTask(name: string) {
    this.tasks.push(name);
    this.newTaskText = "";
  }

  onStartEditTask(i: number) {
    this.taskIdsBeingEdited[i] = true;
  }

  onSaveEditTask(i: number) {
    this.taskIdsBeingEdited[i] = false;
  }

}
