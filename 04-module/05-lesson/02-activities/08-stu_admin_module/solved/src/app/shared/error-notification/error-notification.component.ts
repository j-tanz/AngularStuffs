import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss']
})
export class ErrorNotificationComponent implements OnInit {

  bodyText: string;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

}
