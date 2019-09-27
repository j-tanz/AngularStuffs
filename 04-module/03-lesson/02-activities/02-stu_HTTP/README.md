Instructions:

* Replicate the above in the E-Commerce app so the `ItemsMasterComponent` displays items from the server.

* Start by importing the `HttpClientModule` into the `app.module.ts` file and including it the imports array.

* Do the following in the `items.service.ts` file:
  * import `HttpClient` from `@angular/common/http`
  * import `Observable` from `rxjs`
  * store the following url in a constant called apiUrl: `https://crudpi.io/39f94f`
  * Inject the `HttpClient` in the constructor
  * Create a method called `getItemsFromServer()` that returns a type of `Observable<Item[]>`
  * Add `/items` to the end of the base url and return the results from a request using this new url

* Do the following in the `items-master.component.ts` file:
  * import `Subscription` from `rxjs`
  * Create a property called `itemsSub` and set the type to `Subscription`
  * Create a method called `getItemsFromServer()` that subscribes and updates our items list
  * inside of the `ngOnInit` method call the `getItemsFromServer()` method.


* Optional: Use CrudPi.io to quickly set up an API. You can add data from its UI as well