import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorNotificationService {

  constructor(
    private modalService: NgbModal
  ) { }

  showError(text = "There was an error. Please contact Support for assistance.") {
    const modalRef = this.modalService.open(ErrorNotificationComponent);
    modalRef.componentInstance.bodyText = text;
  }

}
