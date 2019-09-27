Instructions:

* Use a POST request to add an item to the server

In the `admin.component.ts` file do the following:
* import `first` from `rxjs/operators` 
* inside the `onSubmitForm()` method, pass the info from the form into a method called `createNewItemOnServer()` from the `ItemsService`.
* then use the `pipe()` and `first()` methods like you were shown in the demonstration
* subscribe
* reset the form, and call the `getItemsFromServer()` method once you have received a response.

In the `items.service.ts` file do the following:
* Create a method called `createNewItemOnServer` that takes in the following parameters: name, description(optional), price(optional), imageUrl(optional) and returns the type: `Observable<Item>`
* Inside the method create a new `Item` Object 
* Add `/items` to the base url
* Make a post request using the `Item` object as the body and the url that you have created
* return the results of the request