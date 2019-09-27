import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'momentJS';
  firstDate = moment('2010-10-20');
  secondDate = moment('2012-12-22');

  ngOnInit(){}
}

