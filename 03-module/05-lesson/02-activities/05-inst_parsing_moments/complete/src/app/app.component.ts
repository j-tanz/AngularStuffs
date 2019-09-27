import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'momentJS';
  firstDate = moment("12-25-1995", "MM-DD-YYYY");
  secondDate = moment("12/25/1995", "MM-DD-YYYY");
}
