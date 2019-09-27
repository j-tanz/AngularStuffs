Instructions:

* Add the necessary code to have the `ItemDetailComponent` GET a single item (via the `ItemsService`) and display the result.

* In the `items.service.ts` file do the following:
  * Add a method called `getItemByIdFromServer()` that takes in an `itemId` parameter that is a number and returns the type `Observable<Item[]>`
  * Add `/items/` and the `itemId` to the end of the base url and make a GET request using this new url
  * return the response of the GET request
