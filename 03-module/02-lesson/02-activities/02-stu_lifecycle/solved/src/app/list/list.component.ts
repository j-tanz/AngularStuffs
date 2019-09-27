import { Component, OnInit, NgAfterViewInit, NgOnDestroy } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, NgAfterViewInit, NgOnDestroy  {

  tasks: string[] = ["Walk the Dog", "Cook Breakfast", "Get Dressed"];
  displayList = true;

  imgUrl: string = "https://www.roastycoffee.com/wp-content/uploads/caffeine-coffee.jpg";

  constructor() {}

  ngOnInit() {
    console.log("on init");
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

}
