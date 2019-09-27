import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text1 = 'this is our test app for pipes';
  decimal1 = 1.32;
  today = moment()
}
