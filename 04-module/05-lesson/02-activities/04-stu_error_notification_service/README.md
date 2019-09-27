Instructions

* Install bootstrap in your project by running the following command: `npm install --save @ng-bootstrap/ng-bootstrap`
* Add `NgbModule` to your imports in `app.module.ts`
* Replicate the above:
    * Create an `ErrorNotificationService` and `ErrorNotificationComponent`.
    * Add the `showError` method to the `ErrorNotificationService`
    * Add the slightly-adjusted boilerplate code from `ng-bootstrap` for a modal:
```html
<div class="modal-header">
  <h4 class="modal-title">Error</h4>
  <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
  <p>{{bodyText}}</p>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
</div>
```
* Make sure to add the `ErrorNotificationComponent` to your `app.module.ts` file as an `entryComponent`.
```ts
entryComponents: [
    ErrorNotificationComponent
  ]
```
* Test the service and component by calling the `showError()` method in the `admin` component `onInit()` method inside of a `setTimeout()` method with a 2 second delay.
* This activity may go over 45min, so time is allotted in the next section.