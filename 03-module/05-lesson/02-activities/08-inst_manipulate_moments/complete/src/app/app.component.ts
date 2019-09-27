import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'momentJS';
  firstDate = moment("12/25/2019", "MM-DD-YYYY");

  onAddTime() {
    this.firstDate.add(7, 'days');
  }

  onSubtractTime() {
    this.firstDate.subtract(7, 'days');
  }
  
  ngOnInit(){}
}

