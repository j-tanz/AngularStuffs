# Tying Loose Ends: HTTP Interceptor Error Handling, Lazy Loaded Modules & Routes, Route Guards and Resolvers, Builds, and Environments

Open the [slidedeck](https://docs.google.com/presentation/d/14cyUpxbT-mprdPTBVLS9BKSzJ456tC-UIbrFWHWjkbc/edit?usp=sharing) for this lesson.

### The Why ( 5 min )

Today we'll be covering a few more piece parts of Angular that help tie loose ends to make a robust, comprehensive Angular application.

#### Demo
* Demo the completed E-Commerce app

**Prep:**

<details style='background: #ddd;'>
  <summary> 
  Read up on HTTP Interceptors: https://angular.io/guide/http#http-interceptors
  and Lazy Loading Modules: https://angular.io/guide/lazy-loading-ngmodules and Route Guards: https://angular.io/guide/router#milestone-5-route-guards and Angular builds: https://angular.io/cli/build. Also install a basic serve package: https://www.npmjs.com/package/serve
  </summary> 
  
</details>

## HTTP Interceptor Error Handling (45 minutes)

### Instructor Do: Add Basic HTTP Interceptor ( 10 min )

File(s): `02-activities/01-inst_basic_http_interceptor/complete`

* Discuss how HTTP interceptors work
    * Quite simply, they intercept HTTP requests, allowing the app do helpful things like log and manage errors, call other service methods, and manipulate the HTTP request, such as adding `Authorization` headers
    * This is performed by transforming the HTTP request into an `Observable`
    * This is important because if you wanted to add `Authorization` for every HTTP request, you would need to explicitly include this *every single time* you send the HTTP request, and this wouldn't allow us to be DRY in our code (Don't Repeat Yourself)
* Add the boilerplate code from the docs along with a `console.log()` to demonstrate a basic interceptor:
`shared/http-error.interceptor.ts`:
```typescript
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HTTPErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    console.log('req', req);

    return next.handle(req);
  }
}
```

Add the interceptor to the `providers` in the `AppModule` as well as necessary imports:
`app.module.ts`:
```typescript
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPErrorInterceptor } from './shared/http-error.interceptor';
...
providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPErrorInterceptor, multi: true }
  ],
...
```

* Discuss how the interceptor is simply a `class` that implements an interface, namely the `HttpInterceptor` interface. This requires an `intercept` method
    * Reference: https://angular.io/guide/http#write-an-interceptor
* Interceptors can be chained and function quite similarly to middleware found in frameworks like NodeJS Express
* Run the app, pull up the `console.log()`, and show how each HTTP request is now logged (such as when `GET`ting the list of items from the API).
    * Click through properties of the request like `body`, `headers`, `params`, `url`, etc.
* Important: This lesson will only cover taking data from an HTTP Interceptor and using the data to notify users of errors; however, an HTTP Interceptor can (powerfully and simply) modify outgoing requests. **However, the `req: HTTPRequest` is *immutable***. If one wishes to modify the outgoing HTTP request, then use the `req.clone()` method
    * More detail if a student wishes to explore/implement: https://angular.io/guide/http#immutability

### Partners Do: Create a BASIC HTTP Interceptor ( 10-15 min )

File(s): `02-activities/02-stu_basic_http_interceptor/README.md`

For this activity, be sure to send out to students the boiler plate code that they will need to add to `http-error.interceptor.ts`:

```ts
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HTTPErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    console.log('req', req);

    return next.handle(req);
  }
}
```

Instructions

* Implement a basic interceptor that simply logs the request

* Create a file in the shared folder called `http-error.interceptor.ts` and add the boilerplate code sent out to you by your instructional staff.

  - This code can be found in the docs at https://angular.io/guide/http#http-interceptors.

- In your `app.module.ts` make sure to import the following: `HTTP_INTERCEPTORS` and `HTTPErrorInterceptor`.
- Once imported, add the following to your `providers` array: `{ provide: HTTP_INTERCEPTORS, useClass: HTTPErrorInterceptor, multi: true }`

### Instructor Do: Create an `ErrorNotificationService` and add it to the HTTP Interceptor ( 10-15 min )

File(s): `02-activities/03-inst_error_notification_service/complete`

* Walkthrough: Create an `ErrorNotificationService` that notifies the user of an error via a modal
* Bootstrap: We've installed basic Bootstrap CSS via `index.html`, but *it's not adapted for Angular*. Doing things like causing a modal to popup will require an implementation that will feel much more like jQuery than Angular. Thus, let's install a third-party package to help us out (keep the Bootstrap CSS installed in `index.html`): https://ng-bootstrap.github.io/#/getting-started
    * Follow and walkthrough the `ng-bootstrap` install instructions
    * Main pieces: `npm install --save @ng-bootstrap/ng-bootstrap` and add `NgbModule` to the `imports` in `AppModule`
* Create the `ErrorNotificationService` and `ErrorNotificationComponent`

`error-notification.service.ts`:
```typescript
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
```
* Discuss how the `modalService.open()` call returns a reference, and with this reference, we can access the `componentInstance` and thus set one of its properties, such as the `bodyText`
* With the ng-bootstrap package, we inject the `modalService: NgbModal` into the component or service via the constructor.
* We can then call `modalService.open()` and pass in a `TemplateRef` or a component
* NOTE: The component **must be added to the `AppModule`'s `entryComponents` and `declarations`.
    * Reference for why: https://angular.io/guide/entry-components
    * Don't spend too much time here because it's not ultra-important, but you add the `ErrorNotificationComponent` to the `entryComponents` because normally, Angular bootstraps components that are referenced in templates; however, this component is never referenced in a template because it's called dynamically via a service
    * Behind the scenes, Angular already loads routed components as `entryComponents`; however, we won't have to explicitly add a component to `entryComponents` too often. One of the main use cases for doing so is when a modal is used (or any similar dynamic component loading)
`error-notification.component.html`:
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

`error-notification.component.ts`:
```typescript
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
...
  bodyText: string;

  constructor(
    public activeModal: NgbActiveModal
  ) { }
...
```

* Now, a modal can be displayed simply via the `ErrorNotificationService`'s `showError` method
* Test/demonstrate this by injecting it into the `AdminComponent` and calling it in a `setTimeout`:
`admin.component.ts`:
```typescript
...
  ngOnInit() {
    this.getItemsFromServer();

    setTimeout(() => {
      this.errorNotificationService.showError('Test Error')
    }, 2000);
  }
...
```
### Students Do: Create an `ErrorNotificationService` with a Functioning Modal ( 10-15 min )

File(s): `02-activities/04-stu_error_notification_service/README.md`

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

---

## Error Modal for HTTPErrorInterceptor (45 minutes)

### Students Do: Continue: Create an `ErrorNotificationService` with a Functioning Modal ( 5 min )
* Extra time allowed for above activity

### Instructor Do: Trigger an Error Modal for the `HTTPErrorInterceptor` ( 10 min )

File(s): `02-activities/05-inst_simulate_api_error/complete`

* Remove the `setTimeout` in the `AdminComponent`. This will now be added to the `HTTPErrorInterceptor`
* Update the `http-error.interceptor.ts`:
```typescript
...
  constructor(private errorNotificationService: ErrorNotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          this.errorNotificationService.showError(error.message);

          return throwError(error.message);
        })
      )
  }
...
```
*  Recap how an `Observable` can be `piped` and modifications made to its data stream; we've used the `first()` operator before.
* Like `first()`, `catchError` is another RxJS operator we can use
* Reference: https://www.learnrxjs.io/operators/error_handling/catch.html
* The `HttpErrorResponse` has a `message` property, and this is what we want to pass to the `ErrorNotificationService`, such as `this.errorNotificationService.showError(error.message);`
* To test this, we'll simulate an API error. `https://httpstat.us` is a site we can use to test different error codes. We want to test for a server error, such as a 500 error.

`admin.component.ts`:
```typescript
  onSimulateAPIError() {
    // normally we wouldn't use HTTP in a component, but this is just to demonstrate an API error that we can reliably test with an error code
    this.http.get("https://httpstat.us/500")
      .pipe(first())
      .subscribe(
        (res: any) => {

        },
        err => { console.error(err); },
        () => { }
      );
  }
```
* Add a button and add `(click)="onSimulateAPIError()` to it.
* Demonstrate how the `ErrorNotificationService` will show an error now

### Students Do: Trigger an Error Modal for the `HTTPErrorInterceptor` ( 10 min )

File(s): `02-activities/06-stu_simulate_api_error/README.md`

Instructions

* Replicate the above to cause an error to display when there's an API error
* Remove the `setTimeout` in the `AdminComponent`. This will now be added to the `HTTPErrorInterceptor`
* Update the `http-error.interceptor.ts`:
  - Inject the `ErrorNotificaitonService`
  - In the intercept method, catch the error and call the `showError()` method from the `ErrorNotificationService`.
* Inside `admin.component.ts` do the following: 
  - inject `HttpClient` and store it in a private variable called http.
  - write a method called `onSimulateAPIError()` that makes a `GET` request to `https://httpstat.us/500`
* Inside `admin.component.html` add a button that calls the `onSimulateAPIError()` method on click.

### We Do: Recap ( 5 min )
* Recap, call on students, and discuss all we did with error handling before transitioning to the next topic

### Instructor Do: Modularity and Lazy-Loaded Routes ( 10-15 min )

File(s): `02-activities/07-inst_admin_module/complete`

* Angular is built to be modular wiith maintaining Separation of Concerns. Ask the students: What components do we have right now that *shouldn't* be muddied together?
  * `AdminComponent`. In a large application, admin features should really be a totally different module. Let's do so.
* Add `admin.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
```
* Remove the `AdminComponent` from being declared in the `AppModule`
* For the new module, we must import the `FormsModule`, the `ReactiveFormsModule`, and the `NgbModule`, because these were originally only imported in the `AppModule`, and it now must be imported into the `AdminModule`.
* This `AdminModule` will also have its own `AdminiRoutingModule`. Add `admin.routing.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
```
Update the `app-routing.module.ts`:
```typescript
   {
    path: 'admin',
    loadChildren: () => {
      return import('./admin/admin.module').then(mod => mod.AdminModule)
    }
  },
```
* Refer to and send out: https://angular.io/guide/lazy-loading-ngmodules
* The `loadChildren` instructs Angular to *lazy load* this module, meaning that the code of the module *won't actually be run until the route is loaded, because that is when the module is loaded*. This helps keep our apps lean and fast by only running code when the code needs to run.
  * Note: the `() => {}` is another use of an arrow function. In this case, it's synonmous to `function() {}`
  * The Angular docs use a shorthand version with an *implied* `return` and lack of `{}`: `loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)`
  * This can be very tricky for a student who is new to JavaScript/TypeScript, so teaching the more-verbose method that includes the `return` and `{}` is probably going to be more helpful, especially noting how critical having `return` is.
* Thus, in our example, the `AdminModule` code will never be run if the `/admin` route is never accessed.
* Demonstrate how the app still works the same now (navigating to `/admin` should work the same), our code is optimized behind-the-scenes

---

## Route Guards (45 minutes)

### Partners Do: Create the Lazy-Loaded AdminModule ( 10-15 min )

For this activity, be sure to send out the following snippets of code.

Code for `AdminRoutingModule`:

    ```ts
      import { NgModule } from '@angular/core';
      import { Routes, RouterModule } from '@angular/router';
      import { AdminComponent } from './admin.component';

      const routes: Routes = [
        { path: '', component: AdminComponent },
      ];

      @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
      })
      export class AdminRoutingModule { }
    ```

Send out the refactored `AppRoutingModule's `/admin` route as well:

```typescript
 {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  }
```

File(s): `02-activities/08-stu_admin_module/README.md`

Instructions
* Main pieces:
  * Create an `AdminModule` and `AdminRoutingModule`
    - Add the following imports and `AdminComponent` declaration to `AdminModule`:
      - CommonModule
      - AdminRoutingModule
      - FormsModule
      - ReactiveFormsModule
      - NgbModule
    - Add the code that was sent to you by your instructional staff to the `AdminRoutingModule`

  * Remove the `AdminComponent` from the `AppModule` `declarations` and add it to the `AdminModule`
  * Refactor the `AppRoutingModule`'s `/admin` route with the second snippet of code sent to you by the instructional staff.

### Instructor Do: Review ( 5 min )
* Recap the lazy-loaded `AdminModule` and what we accomplished. Call on students for verbal walkthroughs.
* Good segue to route guards: If admin features should only be seen by an admin, how to we ensure this?

### Instructor Do: Route Guards ( 15-20 min )

File(s): `02-activities/09-inst_route_guard/complete`

* Route Guards, as implied, are to guard routes against being accessed
* In our app, we'll create a guard that checks for whether an Admin is logged in or not. If an Admin is logged in (as determined by the new `AdminService`), then the `/admin` route can be accessed. If not, the route will not load.
  * Because we don't actually have a full user and authentication API set up, this will be a simple mock `boolean` in the `AdminService`. We'll create an async `isAuthenticated` method on the `AdminService`.
* Refer to and send out: https://angular.io/guide/router#milestone-5-route-guards
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
* The question may come up of "Why are we adding this service to the `/admin` folder instead of also in the `/shared` folder?"
  * Both are techncially valid, but this is following Separation of Concerns. *It's unlikely that any other part of our application will be major consumers of Admin functionality*. This is up for debate though and is a judgment call; either work fine because the service is still `providedIn` the `root` of the application.

* Now add the guard:
`admin.guard.ts`:
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
* Note the `: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree ` - These are used to give different types of what can be returned. For example, we are returning the `Observable<boolean>` because that's what `this.adminService.isAuthenticated()` uses, but we could also return a basic `boolean` like `true`.
  * The other options are a bit outside the scope of the current material, but encourage the students to research other use cases for this powerful Angular feature

* Update our `app-routing.module.ts` to use this guard to guard against the user using the `/admin` `AdminModule` unless they're logged in:
```typescript
 {
    path: 'admin',
    loadChildren: () => {
      return import('./admin/admin.module').then(mod => mod.AdminModule)
    },
    canActivate: [AdminGuard]
  }
```
* `canActivate` takes in an array because multiple guards or resolvers can be used
* Because `authenticated` is set to false in our `AdminService`, demo how the `/admin` route now can't be activated
* Last, but not least, let's add a button to the Navbar to toggle being authenticated. First, for convenience, set `authenticated` to `true` by default in the `AdminService`
* Add to the `NavbarComponent`
```html
  <button class="btn" (click)="toggleAuth()">Authenicated: {{adminService.authenticated }}</button>
```
```typescript
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    public adminService: AdminService
  ) { }

  toggleAuth() {
    this.adminService.authenticated = !this.adminService.authenticated;
  }

}

```
* NOTE: Using `public` on an injected service is debated; some will argue that this is bad practice. However, it's used here for 2 reasons:
  1. This alows the component's template to directly refernce the `authenticated` property on the `adminService` instead of having to write custom `NavbarComponent` methods to get the property
  2. Learning: When starting out with Angular, it's easy to assume that `private` is *always* used to inject a service, when this is *not* the case. You can inject a service as `public`.
* Demo: The Navbar button will now toggle whether the user is authenticated, and thus will toggle whether the `AdminModule` on `/admin` can be used or not.

### Partners Do: Add the `AdminGuard` and `AdminService` ( Section: 5-10 min | Total: ~20-25m min )

`AdminService` Code:

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

`admin-guard.guard.ts` code:

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




Instructions

* In our app, we'll create a guard that checks for whether an Admin is logged in or not. If an Admin is logged in (as determined by the new `AdminService`), then the `/admin` route can be accessed. If not, the route will not load.
  * Because we don't actually have a full user and authentication API set up, this will be a simple mock `boolean` in the `AdminService`. We'll create an async `isAuthenticated` method on the `AdminService`.
* Start with the CLI: `ng generate guard admin/admin-guard`
* Add a new `AdminService` in `admin/admin.service.ts` sent out to you:

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

- Add the code snippet sent out to you to `admin-guard.guard.ts`:

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


---
## Finish Guards + App Builds (45 minutes)

### Continue: Partners Do: Add the `AdminGuard` and `AdminService` ( Section: 10-15 min | Total: ~20-25m min )
* Finish the above

### Instructor Do: Review ( 5 min )
* Recap the above; call on students to discuss

### Instructor Do: App Builds ( 10 min )
* Last, but not least, what if we want to put our app into production?
* Refer to and send out: https://angular.io/cli/build
* Run `ng build` to build the app. Show how the final build files (**plain html/css/js**) are compiled and minified into a single `/dist` folder with static assets
* The application can now be run just by serving the static files from the `/dist` folder. Use a basic serve package to demonstrate: https://www.npmjs.com/package/serve
* Instructor: Now demonstrate `ng build --configuration=production`
  * This tells Angular to use the build settings for production. This comes from `angular.json`. Pull the file up and skim over the available settings.
  * Particularly note the `fileReplacements`: This replaces our environment file for us! We can add many different environments, but we'll just stick with the base one (as `dev`) and the prod one.
* Update both the `environment.ts` and `environment.prod.ts`:

`environment.ts`:
```typescript
export const environment = {
  name: "dev",
  apiUrl: "https://crudpi.io/39f94f",
  production: false
};
```
`environment.prod.ts`:
```typescript
export const environment = {
  name: "prod",
  apiUrl: "https://crudpi.io/39f94f",
  production: true
};
```
* What's particularly useful here is swapping out our API url, because large apps will also have separate `dev` and `prod` APIs.
* Thus, to use this, update our `ItemsService`: See the final solved code. The main task is to replace the `const apiUrl` with `environment.apiUrl` and import `environment`.
* To example, also add a `<p class="mt-3">Env: {{environment.name}}</p>` to the Navbar HTML and `environment = environment` to the Navbar TS (see in solved). Thus, the current environment can be displayed on the screen.
* Briefly touch on Angular's AOT (Ahead-of-Time) compilation. The 101 is because Angular's HTML, with its custom HTML tags, can't be read by browsers by default, so it must go through a build process.
  * The useful part to know/emphasize for the students is that in this AoT process, Angular **checks our templates** for us. If there is a component property referenced in the template that doesn't actually exist on the component class, then an error will be thrown and the build will fail. This helps you by reducing bugs via basic typos (or if you forgot to declare a property on a component). If time permits, you can demonstrate by adding something like `{{randomVar}}` in the template (and *not* in the `.ts`) and run `ng build --prod`. The build will fail with an error message.
  * Link: https://angular.io/guide/aot-compiler

### Students Do: Implement `apiUrl` into the `environment` files ( 10 min )
* Replicate the above so that the API Url comes from the current environment
* Test this out with `ng build --configuration=production`

### Instructor Do: Review ( 5 min )
* Recap

---