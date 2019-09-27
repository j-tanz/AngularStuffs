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

  adjustYear() {
    this.firstDate.year(1929);
  }

  adjustMonth() {
    this.firstDate.month(2);
  }

  adjustDay() {
    this.firstDate.date(7);
  }

  ngOnInit() {
    setTimeout(() => { this.firstDate.year(1995) }, 2000);
  }

}

