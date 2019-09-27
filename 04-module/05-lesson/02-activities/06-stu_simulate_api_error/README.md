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