import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'momentJS';
}

console.log('december moment', moment("12-25-1995", "MM-DD-YYYY").isValid());
console.log(moment("12-25-1995", "MM-DD-YYYY"));
