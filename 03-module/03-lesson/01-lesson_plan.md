Lesson Plan: 9.3

Open the [slidedeck](https://docs.google.com/presentation/d/1gf2lnup4aMUp4cWbbQJYYFH0h9hS6tRN3xWYHT2OD3U/edit?usp=sharing) for this lesson.

File(s): `02-activities/`

## Review and Task Class Refactor (45 minutes)

### We Do: Review ( 15 min )

* Review component logic (lifecycle hooks, constructors, property binding on `tasks` and `newTaskText`, ngModel basics in the context of Template-Driven forms, services)

* Walk through previous refactor with adding `TasksService` and DI injecting into `ListComponent`

* Review refactor and how the component's methods now call `TasksService` methods to CRUD data

### Instructor Do: Tasks as Classes ( 15 min )

File(s): `02-activities/01-inst_task_class/complete`

Practically, just storing tasks as a string doesn't make sense

To store in a DB with a unique ID and to have additional info/logic for each task, a task should be a class.

Create a `Task` class in `TasksService` with properties `title: string` and `completed: boolean`. Add constructor that takes in and assigns the title and completed to the constructor arguments.

```ts
export class Task {

  title: string;
  completed: boolean;

  constructor(title: string, completed: boolean) {
    this.title = title;
    this.completed = completed;
  }

}
```

* Convert `tasks` data to be an array of `Task`s inside of  the `TasksService` class (`tasks: Task[] = [...]`)

```ts
tasks: Task[] = [new Task("Walk the Dog", false), new Task("Cook Breakfast", false), new Task("Get Dressed", false)];
```

* Change the `addTask` method in the `TasksService` class to take in `title` and `completed` and create a new `Task` object with that information.

```ts
  addTask(title: string, completed: boolean) {
    this.tasks.push(new Task(title,completed));
  }
```

* Update the `getTasks` method within the `TasksService` class to return an array of `Task` objects.

```ts
  getTasks(): Task[] {
    return this.tasks;
  }

```

_Note_: At this point the application will not yet be working, we will do some additional refactoring in the next activity to get our appliciton view working.

### Partners Do: Tasks as Classes ( 15 min )

File(s): `02-activities/02-stu_task_class/README.md`

# Instructions

For this activity, start by using the to-do list application code that you have from the previous class.

Create a `Task` class within your `tasks.service.ts`:

* Include the following properties:
  - title which holds a string
  - completed which holds a boolean 
* Include a constructor that takes in title and completed.
* Convert the `tasks` property of the `TasksService` class to hold `Task` objects instead and construct three objects in the array.
* Update your `addTask` and `getTasks` methods to work with your new `Task` objects.

### Instructor Review: Tasks as Classes ( 5 min )

File(s): `02-activities/02-stu_task_class/solved`

---

## Updating and Review of Editing Functionality (45 minutes)

### Instructor Do: Updating List to Handle Task Objects (10 mins)

File(s): `02-activities/03-inst_list_object_refactor/complete`

We have updated our `TasksService` class to return our `tasks` array as a list of `Task` objects instead of strings. We now have to make some updates to both our `list.component.ts` and `list.component.html` files.

Let's start with changes to our `list.component.ts` file.

- Add `Task` as an import at the top of our file

```ts
  import { TasksService, Task } from '../tasks.service';
```

- Add `TasksService` as a provider in the `@Component` after the `selector`

```ts
  providers: [TasksService]

```

- Next alter the `tasks` array to hold `Task` objects instead of strings

```ts
  tasks: Task[] = [];
```

- Alter our `onCreateNewTask()` method to take in a string called title and a boolean called completed.

```ts
  onCreateNewTask(title: string, completed: boolean) {
    this.tasksService.addTask(title, completed);
    this.newTaskText = "";
    this.getTasks();
  }
```
- Next inside of our `list.component.html` we will need to make the following changes:
  - Change our add task button to take in a default false argument since we have no way to select one and we are required to input completed by our `Task` constructor.

```html
  <button (click)="onCreateNewTask(newTaskText, false)" class="btn btn-success">Add Task</button>
```
  - Change our `p` tag to use the value `task.title` instead of `task`

```html
  <p *ngIf="!taskIdsBeingEdited[i]">{{ task.title }} </p>
```

  - Update our input when we edit tasks so that it accesses the title instead of the entire task object

  ```html
  <input *ngIf="taskIdsBeingEdited[i]" [(ngModel)]="task.title">
  ```

### Partners Do: Updating List to Handle Task Objects ( 15 min )

File(s): `02-activities/04-stu_list_object_refactor/README.md`

# Instructions

Update your `list.component.ts` and `list.component.html` files to handle our new `Task` objects. Follow the instructions below:

Inside your `list.component.ts` file make the following changes:
- Add `Task` as an import at the top of our file.
- Add `TasksService` as a provider in the `@Component` after the `selector`.
- Alter the `tasks` array to hold `Task` objects instead of strings.
- Alter the `onCreateNewTask()` method to take in a string called title and a boolean called completed.
Inside your `list.component.html` file make the following changes: 
- Change the add task button to take in a default false argument as the second argument.
- Change the `p` tag to use the value `task.title` instead of `task`.
- Update our input when we edit tasks so that it accesses the title instead of the entire task object.

### Instructor Review: Updating List to Handle Task Objects ( 5 min )

File(s): `02-activities/04-stu_list_object_refactor/solved`

### We Do: List Item Structure ( 5 mins )

Next we are going to edit our list item structure. We are going to add some grid elements, so that the layout is more organized. In the next section we will be going more in-depth about how the editing functionality and conditional rendering works with our list items. Have the students 

File(s): `02-activities/05-inst_list_layout/complete`

Change the `li` element in our `list.component.html` to look like the following:

```html
<li class="list-group-item" *ngFor="let task of tasks; let i = index">
  <div class="row">
    <div class="col-6">
      <p *ngIf="!taskIdsBeingEdited[i]">{{task.title}}</p>
      <input *ngIf="taskIdsBeingEdited[i]" [(ngModel)]="task.title">
    </div>
    <div class="col-6">
      <button *ngIf="!taskIdsBeingEdited[i]" class="btn-danger float-right mx-1"
        (click)="onDeleteTask(i)">X</button>
      <button *ngIf="!taskIdsBeingEdited[i]" class="btn-info float-right"
        (click)="onStartEditTask(i)">Edit</button>
      <button *ngIf="taskIdsBeingEdited[i]" class="btn-info float-right"
        (click)="onSaveEditTask(i)">Save</button>
    </div>
  </div>
</li>
```

### Instructor Do: Discuss and Review Editing Functionality ( 10 mins )

* Discuss some use cases for *ngIf

  * Talk about how wer are using it for conditional rendering

* Remind the students about our `taskIdsBeingEdited` property. 

  * It's important for the students to understand that if we have a JSON object, `const ourObject = {}`,, then trying to access `ourObject['test']` or `ourObject.test` will yield `undefined`, a **`falsey`** value. A falsey value in an expression will *not* render.

  * We used this property with a JSON object to identify which tasks we are going to edit. If we had just a single property for the entire list all the of list items would be in an editing state at once.

  * There are multiple ways this could be done. This is just 1 example.
    * Prompt the students to come up with other ideas for how this could be done and discuss some of these ideas.

* Demonstrate how all of this comes together:
  * When edit is clicked, the `<p>` title for the task disappears and an `<input>` appears thats ngModel bound to the `task.title`. The Edit `<button>` disappears and instead a `Save` button appears; similarly, the opposite happens after the Task is saved, namely that the `<p>` reappears, `<input>` and the Save `<button>` disappear, and the Edit `<button>` reappears.


### Instructor Do: Extended Review Time ( 5 min )

* Review the above in-depth.

* PLAN: Extra time is allotted here to cover truthy/falsey, expressions, and JSON - these are critical for the students to understand. Field questions, call on students to discuss, give more examples, etc. Do what is best for your class's current understanding. 

## Master-Detail Patterns (45 minutes)

### Instructor Do: Discuss & Demonstrate Master-Detail Patterns ( 10 min )

* Discuss:
    * A common pattern in web development is the master-detail pattern. This can be implemented in a handful of different ways, but the recurring theme is a (master) list and when an item is clicked on the master list, a detail view is displayed; hence "master-detail".
    * Master-detail patterns are most commonly seen on iOS/Android apps where screen width is limited. For example, the the phone app on iOS shows a (master) list of all calls, and then an info button can be pressed to see the detail view of a call.
    * Pull up a few website examples of master-detail patterns
        * Useful graphic: https://blog.webix.com/master-details-pattern-with-webix-ui/
        * Mobile views: https://medium.com/@lucasurbas/case-study-master-detail-pattern-revisited-86c0ed7fc3e

File(s): `02-activities/06-inst_task_detail/complete`

* We'll now implement this pattern in our To-Do list app, with the master list of tasks and a detail view of an individual task.
* Code:

    * Add a `taskBeingDisplayed: Task` property on the ListComponent. This will be to display a task

    * Create a task detail view on `list.component.html`. First, change the first part of the `ListComponent` view to use `col-6` to split the view. Create a second `<div class="col-6">` area next to it for the detail view, and add an `<h4>` that shows the `taskBeingDisplayed`'s title.

```html
<div class="row" *ngIf="displayList">

    <div class="col-6">
      <ul class="list-group">
       ...
      </ul>
    </div>

    <!-- task detail -->
    <div class="col-6" *ngIf="taskBeingDisplayed">
    <h4>{{taskBeingDisplayed.title}}</h4>
    </div>
    <!-- end task detail -->
</div>
```
* To show that this works, in `getTasks()`, inside the `setTimeout` set `taskBeingDisplayed` to the first task in `tasks`. The Task's title will display on the template.

### Partners Do: App Layout and Display Property ( 10 min )

File(s): `02-activities/07-stu_task_detail/README.md`

# Instructions

* Add the `taskBeingDisplayed: Task` property to the List Component
* Restructure your `ul` to have the following format:

```html
<div class="row" *ngIf="displayList">

    <div class="col-6">
      <ul class="list-group">
       ...
      </ul>
    </div>

    <!-- task detail -->
    <div class="col-6" *ngIf="taskBeingDisplayed">
    <h4>{{taskBeingDisplayed.title}}</h4>
    </div>
    <!-- end task detail -->
</div>
```

* Make sure that this is working, in `getTasks()`, inside the `setTimeout` set `taskBeingDisplayed` to the first task in `tasks`. The Task's should display on the template. 


### Instructor Review: App Layout and Display Property ( 5 min )

File(s): `02-activities/07-stu_task_detail/solved`


### Instructor Do: Finalize Detail View ( 10 min )


File(s): `02-activities/08-inst_task_detail_text/complete`

* Continue with seting up the detail view:
* In the template, discuss how Angular is going to check whether `taskBeingDisplayed` is *`truthy`*
        * Side note: If you haven't yet, discuss truthy vs. falsey. These are very important for JS/TS and Angular.
        * Primer: https://j11y.io/javascript/truthy-falsey/

* Add a `view` button that takes in the task as an argument inside of `list.component.html`

```html
  <button *ngIf="!taskIdsBeingEdited[id]" class="btn-info float-right mx-1" (click)="onViewTaskDetails(task)">View</button>
```

* Add a `<textarea>` with an `[(ngModel)]` of `taskBeingDisplayed`'s `detailText` inside of `list.component.html`.

```html
  <hr>
<textarea [(ngModel)]="taskBeingDisplayed.detailText"></textarea>
```

* Add a method in `list.component.ts` to set the task being displayed to the one passed in from the view button click

```ts
onViewTaskDetails(task: Task) {
    this.taskBeingDisplayed = task;
}
```

* _Note_: you will no longer need to set the task in the `getTasks` method so you can remove this line.

* Demonstrate: Edit the text in the `<textarea>` for a few tasks and show how this edited data persists across selecting different tasks. Add a breakpoint via Chrome Devtools to show how the data model has changed due to `[(ngModel)]`'s two-way binding.

### Partner Do: Finalize Detail View ( 10 min )

File(s): `02-activities/09-stu_task_detail_text/README.md`

# Instructions

* Add a `view` button that takes in the task as an argument inside of `list.component.html`
  * make it only appear if the task is not being edited
  * give it an on click event that triggers a method called `onViewTaskDetails` that takes in the `task`
* Add a `<textarea>` with an `[(ngModel)]` of `taskBeingDisplayed`'s `detailText` inside of `list.component.html`.
* Add a method in `list.component.ts` to set the task being displayed to the one passed in from the view button click
* _Note_: you will no longer need to set the task in the `getTasks` method so you can remove this line.

### Instructor Do: Review ( 5 min )
* Review above. Reiterate how ngModel is a part of Template-Driven forms, which can go *much* more in-depth and be fully used for complex forms, but for this course, Reactive Forms will be used for easier creation, testing, and debugging with a focus on a data model in the TypeScript code rather than in the HTML template.
* Send out for student reference on Template-Driven forms: https://angular.io/guide/forms
