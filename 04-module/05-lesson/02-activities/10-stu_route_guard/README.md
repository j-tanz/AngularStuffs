Instructions

* In our app, we'll create a guard that checks for whether an Admin is logged in or not. If an Admin is logged in (as determined by the new `AdminService`), then the `/admin` route can be accessed. If not, the route will not load.
  * Because we don't actually have a full user and authentication API set up, this will be a simple mock `boolean` in the `AdminService`. We'll create an async `isAuthenticated` method on the `AdminService`.
* Start with the CLI: `ng generate guard admin/admin-guard`
* Add a new `AdminService` in `admin/admin.service.ts`:
```typescript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  authenticated = false;

  isAuthenticated(): Observable<boolean> {
    // we're using an observable here because this may, in a production setup, require an asynchronous HTTP request. Thus, if we structure our app to use an observable here even when synchronous, then transitioning to an asynchronous setup will be simple by still using Observables
    return of(this.authenticated)
  }

  constructor() { }

}

```

- Add the following code to `admin-guard.guard.ts`:

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private adminService: AdminService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.adminService.isAuthenticated();
  }

}
```
- In the `app-routing.module.ts` file, add a property called `canActivate` to the `admin` route and set its value equal to an array that holds `AdminGuard`.

- In the `navbar.component.html` file add a button that shows the value of the `AdminService` `authenticated` property and has an `onClick` event listener that calls a method called `toggleAuth()`

- In the `navbar.component.ts` file make the following changes:

  - Inject the `AdminService` using the public keyword instead of private.

  - Add a method called `toggleAuth()` that directly alters the value of the `AdminService` property called `authenticated`.

