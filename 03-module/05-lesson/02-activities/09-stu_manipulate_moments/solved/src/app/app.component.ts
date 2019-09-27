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

  onAddDays() {
    this.firstDate.add(7, 'days');
  }

  onSubtractDays() {
    this.firstDate.subtract(7, 'days');
  }

  onAddMonth() {
    this.firstDate.add(1, 'month');
  }

  onSubtractMonth() {
    this.firstDate.subtract(1, 'month');
  }
  
  ngOnInit(){}
}

