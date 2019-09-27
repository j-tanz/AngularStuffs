import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  authenticated = true;

  isAuthenticated(): Observable<boolean> {
    // we're using an observable here because this may, in a production setup, require an asynchronous HTTP request. Thus, if we structure our app to use an observable here even when synchronous, then transitioning to an asynchronous setup will be simple by still using Observables
    return of(this.authenticated)
  }

  constructor() { }

}
