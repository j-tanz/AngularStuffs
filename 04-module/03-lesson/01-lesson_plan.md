Lesson Plan: 10.3

Open the [slidedeck](https://docs.google.com/presentation/d/1QbJXuuzqMjDDTh8mRmhociFEL4hUngY_RZw888IFGf4/edit?usp=sharing) for this lesson.

## HTTP Requests (45 minutes)

### The Why ( 5 min )

Learning how HTTP requests work is critical to building a web application. HTTP requests are used to talk to servers, which run important tasks such as CRUD functions for our data, communicate with other servers, authorize users, and more.

#### Demo
Demo the completed E-Commerce with HTTP (Part 1, the main activity for this lesson)

**Prep:**

<details style='background: #ddd;'>
  <summary> 
  * Review and send out the Angular guide to HTTP: https://angular.io/guide/http<br>
  * Review and send out the Angular guide to `Observable`s: https://angular.io/guide/observables<br>
  * NOTE: This lesson plan uses https://crudpi.io for a quick API setup. Feel free to use that or your own API
  </summary> 
  
</details>

### Instructor Do: Set Up HTTPClient ( 15 min )

File(s): `02-activities/01-inst_HTTP`

* Discuss the importance of HTTP requests and how they'll be used and what they're used for

* Refer to and send out the Angular HTTP docs: https://angular.io/guide/http

* Walkthrough:

    * Import the HTTPClientModule into the main `AppModule`

    ```ts
    import { HttpClientModule } from '@angular/common/http';

    imports: [
    HttpClientModule
    ```

    * Start with `ItemsService` to import the HTTP client and set up a basic GET route via CrudPi.io. 
    
Walk through the following code:


```typescript
// `items.service.ts`:

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

  const apiUrl = "https://crudpi.io/39f94f"
  ...

  constructor(
    private http: HttpClient
  ) { }

  getItemsFromServer(): Observable<Item[]> {
    const url = apiUrl + "/items";
    return this.http.get<Item[]>(url)
  }
```

* The `Item[]` denotes are optional, but are helpful:

    * Explain how the `: Observable<Item[]>` denotes that the method returns an `Observable` that will result in data of type `Item[]`

    * Explain how the open/close arrows `<Item[]>` in `this.http.get<Item[]>(url)` denote that the HTTP request's data will be of type `Item[]`.

    * Later: Demonstrate how VS Code will show a red underline error if the type of data the `Observable` is returning doesn't match up with what `subscribe()` notes.

* **Important**: Mention that the `HTTPClient` service should almost *never* be directly imported into a component. Why? Separation of Concerns, the Single Responsibility Principle (SRP), and DRY (Don't Repeat Yourself). A component is really only concerned about its view and user interaction; complex business logic should be abstracted to a service. Other components can then use the service's logic, keeping the application DRY.

* Update `ItemsMasterComponent` to use this route:

```typescript
// `items-master.component.ts`:

import { Subscription } from 'rxjs';

  itemsSub: Subscription;

    ngOnInit() {
    this.getItemsFromServer();
  }

  // REMOVE the old getItems method!

  getItemsFromServer() {
    this.itemsSub = this.itemsService.getItemsFromServer()
      .subscribe(
        (res: Item[]) => {
          console.log('items res', res);
          this.items = res;
        },
        err => { console.error(err); },
        () => { }
      );
  }
```

* Refer to and send out the Angular Observable docs: https://angular.io/guide/observables

*  Walkthrough how subscribe works: Similar to a promise, but has 3 possible outcomes: next (emission of data), error, and complete.

    * We only have to include the first one, but it can help us out to create a code snippet that includes all 3 for ease of use.

* Demonstrate the working code with how the Items are pulled from the API via the `ItemsService` and then rendered in the `ItemsMasterComponent`

### Partners Do: First API Request( 15-20 min )

File(s): `02-activities/02-stu_HTTP/README.md`

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

### Instructor Review: Recap ( 5 min )

File(s): `02-activities/02-stu_HTTP/solved`

### Instructor Review: Unsubscribe from Observables ( 5 min )    

File(s): `02-activities/03-inst_unsub`

* Discuss how an observable can created and referenced anywhere, but it isn't *executed* until `.subscribe` is called.

* (You can demonstrate this by just calling `this.itemsService.getItemsFromServer()` in the `ItemsMasterComponent`, but nothing occurs).

* However, a subscription *can persist even after a component is destroyed* if it is not unsubscribed from. 

Add:

```typescript
// `items-master.component.ts`:

export class ItemsMasterComponent implements OnInit, OnDestroy {

  ...

  itemsSub: Subscription;

  ...

  ngOnDestroy() {
    if (this.itemsSub) {
      this.itemsSub.unsubscribe();
      console.log(this.itemsSub);
    }
  }
```

* Discuss `ngOnDestroy` if you haven't already

* The conditional checks for whether the subscription exists/is truthy (we don't want to assume it does) and unsubscribes if it does

* There are *many* ways to unsubscribe from an observable `Subscription`, but this is a fairly explicit and clean way to do so (good for beginners without diving deep into RxJS operators)

### Students Do: Add Unsubscribe Logic ( 5 min )

File(s): `02-activities/04-stu_unsub/README.md`

Instructions: 

* Add unsubscribe logic to the `ItemsMasterComponent`
  * Implement the `OnDestroy` interface and add an `ngOnDestroy()` method
  * Inside your `ngOnDestroy()` method check if an `itemsSub` exists, and if it does, unsubscribe from it.

---

## Break (5 mins)

---

## GET Item Detail (45 minutes) 

### Instructor Do: GET Item by ID( 10-15 min )

File(s): `02-activities/05-inst_GET_by_ID`

* Add to the `ItemsService` and walkthrough:

```typescript
// `items.service.ts`:

getItemByIdFromServer(itemId: number): Observable<Item> {
    const url = apiUrl + `/items/${itemId}`; // same as "/items/" + itemId

    return this.http.get<Item>(url)
  }
```

* This is quite similar to the initial GET, but this is to get one by ID

    * This assumes that the API being used can access an individual item by `/items/:id` (such as with CrudPI.io)

* Similarly, code out and walk through in `ItemDetailComponent`

* (Console logs are optional, but can be helpful for discussion/demo):

```typescript
// `item-detail.component.ts`:

  ngOnInit() {
    this.paramSub = this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        console.log('paramMap itemIndex', paramMap.get('itemIndex'));
        const itemIndex = +paramMap.get('itemIndex');
        this.getItemFromServer(itemIndex);
      })
  }

  getItemFromServer(itemId: number) {
    this.itemsService.getItemByIdFromServer(itemId)
      .subscribe(
        (res: Item) => {
          console.log('res', res);

          this.item = res;
        },
        err => { console.error(err); },
        () => { }
      );
  }
```

If you haven't already, head over to the `item-card.component.html` and alter the following code:

```html
<!-- item-card.component.html -->

<a [routerLink]="[item.id]" class="btn btn-primary">Open Details</a>
```

* The `ItemDetailComponent` should now be render the single item detail.

* **Note**: The question may arise of *"Why are we using a GET for a single item when we previously were getting all items in one request?"* The answer is that with an API, a GET all items (or a GET all of anything else) will likely only give a small piece of each data; for example, an Amazon search is mostly only going to display the item's name, image, and price. When you go to the detail page for an item, *much more data, specific to that item, will be displayed*. This minimizes server traffic by adding the extra data when a GET single item is displayed, instead of sending *all* data for ~30+ items at once.

* Also **important**: The question may arise of *Why are we passing in `itemId: number` into `getItemFromServer(itemId: number)` instead of using `this.itemId` somewhere in the component?* The reason is because we want to keep our functions pure: When one input is given, it should *always* have the same output. However, `getItemFromServer()` without a parameter is not a pure function, because what item is it getting? There are no inputs. Its dependent on the state of `this.itemIndex`, which can differ throughout time. We want our method to perform the same way every time to keep our code predictable and bug-free. It also helps future developers/colleagues understand the code.


### Partners Do: Add Item Detail HTTP Request ( 10-15 min )

File(s): `02-activities/06-stu_GET_by_ID/README.md`

Instructions:

* Add the necessary code to have the `ItemDetailComponent` GET a single item (via the `ItemsService`) and display the result.

* In the `items.service.ts` file do the following:
  * Add a method called `getItemByIdFromServer()` that takes in an `itemId` parameter that is a number and returns the type `Observable<Item[]>`
  * Add `/items/` and the `itemId` to the end of the base url and make a GET request using this new url
  * return the response of the GET request

### Instructor Do: Review ( 5 min )

File(s): `02-activities/06-stu_GET_by_ID/solved`

* Recap the above

* Also demonstrate how if we change the `.subscribe` to something like `.subscribe( (res: string) => {` then VS Code will give us an error, because the `getItemByIdFromServer()` returns an `Observable<Item>`, yet the .`subscribe` code notes that the emitted data will be a string.

### Partners Do: Update the `AdminComponent` to GET Items ( 10 min )

File(s): `02-activities/07-stu_update_admin/README.md`

* Similar to GETting all items for the `ItemsMasterComponent`, add code to GET all items for the `AdminComponent`

### Instructor Do: Review ( 5 min )

File(s): `02-activities/07-stu_update_admin/solved`

Instructions:

* Update the `admin.component.ts` file to use a subscription to render items, just like you did with the `items-master.component.ts` file.
* Feel free to look back at that activity for help with this one
* At the end of this activity, the list in the `admin` component should be rendering from the data on the server.

```typescript
// `admin.component.ts`:
import { Subscription } from 'rxjs';

itemsSub: Subscription;

  ngOnInit() {
    this.getItemsFromServer();
  }

// REMOVE the original getItems()
  getItemsFromServer() {
    this.itemsSub = this.itemsService.getItemsFromServer()
      .subscribe(
        (res: Item[]) => {
          console.log('items res', res);
          this.items = res;
        },
        err => { console.error(err); },
        () => { }
      );
  }
```
---

## Lunch (5 mins)

---

## Admin Functions: Add and Delete (45 minutes)

### Instructor Do: POST: Add Item via Server( 15 min )

File(s): `02-activities/08-inst_POST`

* Walkthrough the code to have the `AdminComponent` form create a new item:

```typescript
// `admin.component.ts`:

import { first } from 'rxjs/operators';

  onSubmitForm() {

      // create a new item
      const name = this.addItemForm.value.name;
      const description = this.addItemForm.value.description;
      const price = this.addItemForm.value.price;
      const imageUrl = this.addItemForm.value.imageUrl;

      this.itemsService.createNewItemOnServer(name, description, price, imageUrl)
        .pipe(
          first()
        )
        .subscribe(
          (res: Item) => {
            console.log('created item res', res);

            this.addItemForm.reset();

            this.getItemsFromServer();
          },
          err => { console.error(err); },
          () => { }
        );

```

```typescript
// `items.service.ts`:

  createNewItemOnServer(name: string, description?: string, price?: number, imageUrl?: string): Observable<Item> {

    const newItem = new Item(name, description, price, imageUrl);

    const url = apiUrl + `/items`; // same as "/items/" + itemId
    const body = newItem;
    return this.http.post<Item>(url, body)
  }
```

### Partner Do: POST to Create an Item ( 15 min )

File(s): `02-activities/09-stu_POST/README.md`

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

### Instructor Do: Review ( 5 min )

File(s): `02-activities/09-stu_POST/solved`

---

## Break (5 mins)

---

### Instructor Do: DELETE Item from Server ( 5-10 min )

File(s): `02-activities/10-inst_DELETE`

* Walk through the code to delete an item off of the server:

```typescript
// `admin.component.ts`:

  onDeleteItem(i: number) {
    this.itemsService.deleteItemByIdFromServer(i)
      .subscribe(
        (res: any) => {
          console.log('delete res', res);
          this.getItemsFromServer();
        },
        err => { console.error(err); },
        () => { }
      );

  }
```

```html
<!-- `admin.component.html`: -->

`...<button class="btn btn-danger float-right" (click)="onDeleteItem(item.id)">X</button>...`
```


```typescript
// `items.service.ts`:

  deleteItemByIdFromServer(itemId: number): Observable<Item> {
    const url = apiUrl + `/items/${itemId}`; // same as "/items/" + itemId
    return this.http.delete<Item>(url)
  }
```

---

### Students Do: DELETE Item ( 5-10min )

File(s): `02-activities/11-stu_DELETE/README.md`

Instructions:

* Update your code in the following places to add the ability to delete items from the server using your existing delete buttons:
  * `admin.component.ts`
  * `admin.component.html`
  * `items.service.ts`
* Reference the previous exercise where you added the functionality to get an item by id, as it will be very similar to deleting an item by id.

### Instructor Do: Review ( 5 min )

File(s): `02-activities/11-stu_DELETE/solved`

### Instructor Do: PUT: Edit Item( 15-20 min )

File(s): `02-activities/`

* To keep our code DRY, we'll reuse the `addItemForm` to edit an item with a PUT request. We'll add an `Edit` button next to each item, while calls `onStartEditItem()`.

* **Since there are many changes, review the final code for how to implement the Edit Item functionality (instead of having the whole parts pasted in the lesson plan)**

* Important parts: 

    * `AdminComponent`: Add an Edit button for each item. This calls `onStartEditItem()` and patches the form with the clicked item and sets `this.editingItemId` to the Item's ID

    * `this.editingItemId` is used to track 1. IF an ID is being edited and 2. What ID is being edited if so. This is useful because we can (in the template) know if an ID is being edited and display the relevant UI parts if so. If it's undefined, then an item isn't being updated. **Careful: Don't use shorthand `*ngIf="editingItemId"` in the template; `*ngIf="editingItemId !== undefined`. Because this is a number, shorthand truthy/falsey can change by it being a 1 or 0, but we just want to check for whether it's not `undefined`

    * In `onSubmitForm()`, we also check whether `editingItemId` is `undefined` to know if an item is being edited, and thus either run a POST/create call or a PUT/update call.

    * Add a "Cancel Edit" button that is only displayed if `this.editingItemId` is not `undefined`, and when clicked, it will set `this.editingItemId` to `undefined`.

    * Finally, within `items.service.ts`, create the `updateItemOnServer` method:

    ```ts
    updateItemOnServer(itemId: number, name: string, description: string, price: number, imageUrl: string): Observable<Item> {

      const newItem = new Item(name, description, price, imageUrl);

      const url = apiUrl + `/items/${itemId}`; // same as "/items/" + itemId
      const body = newItem;

      return this.http.put<Item>(url, body)
  }s

    ```

### Partners Do: Add Edit Functionality( 20 min )

File(s): `02-activities/13-stu_UPDATE/README.md`

Instructions: 

* Add the code to edit an item from the admin screen.

In the `admin.component.html` file do the following:
* Add an edit button for each item that calls a method called `onStartEditItem()` that passes in the item
* Add a cancel edit button next to the submit button in the form that calls the method `onCancelEditItem()`
  * Make sure this button only shows up if the property `editingItemId` does not equal undefined

In the `admin.component.ts` file do the following:
* Create an `onStartEditItem()` method that patches the form with the clicked item and sets `this.editingItemId` to the Item's ID.
* Create an `onCancelEditItem()` method that resets the form and sets `editingItemId` to undefined.
* Edit the logic of the `onSubmitForm()` method so that it checks whether or not `editingItemId` is undefined and makes the appropriate type of request (PUT or POST).

In the `items.service.ts` file do the following:
* Create an `updateItemOnServer()` method that makes the appropriate PUT request.

### Instructor Do: Review ( 5 min )

File(s): `02-activities/13-stu_UPDATE/solved`

* Recap

---