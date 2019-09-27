import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tasks: string[] = ["Walk the Dog", "Cook Breakfast", "Get Dressed"];
  displayList = true;

  constructor() {}

  ngOnInit() {
  }

  onToggleDisplay() {
    this.displayList = !this.displayList;
  }

}
