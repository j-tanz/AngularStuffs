# More HTTP, Pipes,and RxJS Observables

Open the [slidedeck](https://docs.google.com/presentation/d/1wHhDPiXQWecR9QPaWK8sj4amx8_eLOKOTWCe4n-JQYE/edit?usp=sharing) for this lesson.

## Introduction to Pipes (55 minutes)

### The Why ( 5 min )

In our last lesson, we covered the basics of the Angular `HttpClient` which also uses `Observable`s. These can be *very* tricky but are an important concept used in many places in Angular, so we're going to dive more in-depth with them today.

#### Demo


**Prep:**

<details style='background: #ddd;'>
  <summary> Be familiar with and ready to teach Angular pipes: https://angular.io/guide/pipes </summary> 
  
</details>

### Instructor Do: Pipes Introduction ( 5-10 min )

* Refer to and send out: https://angular.io/guide/pipes

* Discuss/lecture:

    * When our applications get data, the format the data comes in is often *not* a user-friendly view.

        * For example, a name might be returned from the database as `JENNIFER SMITH` and we'd want to display it to the user as `Jennifer Smith`.

        * An account balance may be `0` or `1.32`, but we want to display the balance as `$0.00` or `$1.32`, respectively.

        * A date may be returned as `08/23/19`, but we want to display it as `August 23rd, 2019`.

    * Conceptually, where should these be managed? (Component template/HTML, component TypeScript, or in the service?) Discuss with students.

    * The answer is in the HTML template (generally).s
    
      Why? Separation of concerns. Our `ItemsService` should not be concerned with how our `AdminComponent` renders an item's title on the screen. The data transform *could* happen in the component's TypeScript, but because how data is displayed is primarily concerned with the view, the code should reside in the view. 

    * We *could* write transform logic in the component's TypeScript, but this may not be DRY (Don't Repeat Yourself), because what if another component wants to reuse that same data transform logic?

    * We can and will write some of the transform logic in TypeScript (in its own `@Pipe` file), but the use of the pipe will be noted in the HTML template.

        * (Of course, there will be valid exceptions and edge cases, but this is a general rule of thumb)

    * This brings us to pipes. **Pipes transform data** by taking an input and transforming it into an output. Quite simply, they are functions but with very specific purposes.

### We Do: Pipe Activity 1 ( 15 min )

File(s): `02-activities/01-we_pipe`

* Instructor demo and discuss while students do as well. Use creativity here! The tasks below are simply examples.

* Create and scaffold a new application with `ng new`. `npm i moment` and import it into the `AppComponent` with `import * as moment from 'moment'`.

* In the new `AppComponent`, create multiple properties: a string (with multiple words in it), a decimal number with 2 decimal places, and a date.

* Interpolate these properties in the template

* string: Test out the following pipes: {{ value_expression | uppercase }}, {{ value_expression | lowercase }}, {{ value_expression | titlecase }}

* number: Test out the following pipes: {{ value_expression | currency }}, {{ value_expression | number }}, {{ value_expression | number: '1.1-3' }}, {{ value_expression | number: '1.3-3' }}, along with variations

* Moment/date: Test out the following pipes: {{ value_expression | date: 'short' }}, {{ value_expression | date: 'medium' }}, {{ value_expression | date: 'long' }}, {{ value_expression | date: 'shortDate' }}, {{ value_expression | date: 'longDate' }}, {{ value_expression | date: 'mediumTime' }}, {{ value_expression | date: 'fullTime' }}

    * Also use a custom format, such as {{today | date:'h:mm a yyyy'}}

* Pipes can be chained: `{{today | date:'fullDate' | uppercase}}`

* Helpful links:
    * https://angular.io/api/common/UpperCasePipe
    * https://angular.io/api/common/LowerCasePipe
    * https://angular.io/api/common/TitleCasePipe
    * https://angular.io/api/common/DecimalPipe
    * https://angular.io/api/common/DatePipe

### Instructor Do: Custom Pipes( 15 min )

File(s): `02-activities/02-inst_custom_pipe`

* Refer to and send out: https://angular.io/guide/pipes#custom-pipes

* Walk through creating a new custom pipe. This pipe will take the number and multiply it by the input (or 1 if no input).

New file:  `multiply.pipe.ts`:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'multiply' })
export class MultiplyPipe implements PipeTransform {
  transform(value: number, numToMultiply?: number): number {
    let finalMultiplyNum;
    if (isNaN(numToMultiply)) {
      //handle case of numToMultiply not actually being a number
      finalMultiplyNum = 1;
    } else {
      //is a number, so use it
      finalMultiplyNum = numToMultiply;
    }
    return value * finalMultiplyNum;
  }
}
```

Also declare it in the `app.module.ts`:

```typescript
...
 declarations: [
    AppComponent,
    MultiplyPipe
  ],
...
```

* Discuss the `PipeTransform` interface, which is always implemented via a `transform` function in a pipe

  * The first argument, `value`, is required
  * The remaining arguments are optional, and are parameters passed in when the pipe is used
  * It must be return a value to be displayed
  * The `name` in the `@Pipe` decorator is what is used in the HTML template

### Partners Do: Create a Custom Pipe ( 20 min )

* Create a custom pipe and implement it in the `AppComponent`. Use creativity for what type of pipe to make!

---

## Break ( 5 mins )

---

## Pipes as *ngFor Filters (45 minutes)

### Instructor Do: Pipes as *ngFor Filters ( 10-15 min )

File(s): `02-activities/03-inst_pipe_filter`

* Pipes can also be used to filter items in an `*ngFor`

  * For reference: https://angular.io/guide/pipes#flyingheroespipe

* Back to the E-Commerce app. On the `ItemsMasterComponent`, what if we want to filter all listed items by a search string?

* Walkthrough and demonstrate:

```typescript
// `shared/item-search.pipe.ts`

import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './items.service';
@Pipe({
  name: 'itemSearch'
})
export class ItemSearchPipe implements PipeTransform {

  transform(values: Item[], filterText: string): any {
    return values.filter((item: Item) => {
      if (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) {
        return true;
      }
      if (item.description && item.description.toLowerCase().includes(filterText.toLowerCase())) {
        return true;
      }
      return false;
    });
  }
}
```

```html
<!-- `items-master.component.html` -->

 <div class="col-6 mb-3" *ngFor="let item of (items | itemSearch: filterText); let i = index;">
      <app-item-card [item]="item" [i]="i"></app-item-card>
</div>
```

* Also add `filterText = ""` to `items-master.component.ts`

* Be sure to import the `FormsModule` and `ItemSearchPipe` into `AppModule`.

```ts
// app.module.ts

  declarations: [
    ...
    ItemSearchPipe
  ],
  imports: [
    ...
    FormsModule
  ]

```

### Students Do: Implement Custom Filter Pipe ( 20 min )

File(s): `02-activities/04-stu_pipe_filter`

Instructions:

Implement the code shown in class to allow a user to filter all displayed items on `ItemsMasterComponent`.

Remember that you will have to create a new file, `item-search.pipe.ts`, as well as change both the HTML and TS file inside of items-master.

Don't forget to import `FormsModule` and `ItemSearchPipe` into AppModule!

### Instructor Do: Review ( 5-10 min )

File(s): `02-activities/04-stu_pipe_filter/solved`

Walk students through the steps at a high-level to complete implementing the filter pipe.

---

## Lunch ( 60 mins )

---

## Continue Building E-Commerce: Cart + Checkout

These remainder of class will be both a refresher of Angular and will be used to build out the E-Commerce app using our latest functionality.

These piece parts can be broken down into a student activity (where the instructor may provide a quick 101 refresher, and then have the students implement, upon which the instructor will review the solved code. Then, the instructor will send out the solved code for the students to work on the next part)

Major piece parts (see the code for implementation):

* Add functionality to the `CartService` to add items and get items

* Add an `AddToCartButtonComponent` that when clicked, will add a button to the cart. Add this button to both the `ItemDetailComponent` and `ItemCardComponent`

  * Question: Why abstract this out? Why not just have individual `<button>`s in the components and add Add-To-Cart logic to the components? Answer: Separation of Concerns and DRY. You would be duplicating `onAddToCart` functions in both the `ItemDetailComponent` and `ItemCardComponent`. Plus, you can add visual aids such as a 2.5 second timeout to change the button's display text after it is clicked, and then you don't need to repeat this code in each component.

* Add a `CheckoutComponent` and add a `/checkout` route for it

  * Have it show a list of all items in the cart from the `CartService` (much of the HTML can be easily copied from the `AdminComponent`)

  * Show a total $ amount for purchasing all items

  * Have a `Purchase` button that calls `purchaseItems` in the `TransactionsService`

* `TransactionsService`: Add `purchaseItems` code. This will NOT send a real HTTP request, but instead, mock out a purchase by having it return an Observable that resolves with the purchased items (an Observable is returned to mock a true HTTP request and then `.subscribe()` can be used in the component.

* Add a `NavbarComponent` link to go to `/checkout`

---