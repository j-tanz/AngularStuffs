import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {

  tasks: string[] = [];
  displayList: boolean = true;
  imgUrl: string = "https://www.roastycoffee.com/wp-content/uploads/caffeine-coffee.jpg";
  newTaskText: string = "";
  taskIdsBeingEdited = {};


  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  ngOnInit() {
    console.log("on init");
    this.getTasks();
  }

  ngAfterViewInit() {
    console.log("after view init");
  }

  ngOnDestroy() {
    console.log("on destroy")
  }

  onToggleDisplay() {
    this.displayList = !this.displayList;
  }

  onDeleteTask(i: number) {
    this.tasksService.deleteTask(i);
    this.getTasks();
  }

  onCreateNewTask(name: string) {
    this.tasksService.addTask(name);
    this.newTaskText = "";
    this.getTasks();
  }

  onStartEditTask(i: number) {
    this.taskIdsBeingEdited[i] = true;
  }

  onSaveEditTask(i: number) {
    this.taskIdsBeingEdited[i] = false;
  }

  getTasks() {
    setTimeout(()=>{
      this.tasks=this.tasksService.getTasks();
    },0);
  }


}
