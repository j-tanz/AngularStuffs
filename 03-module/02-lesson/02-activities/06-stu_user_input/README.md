# Activity: Angular User Input

## Instructions:

You'll be continuing to add code to your existing To-Do application.

For this activity, do the following:

1. Import the `FormsModule` into app.module.ts. Be sure to also add the imported FormsModule into the `imports` object.
1. Add a `newTaskText` property to the ListComponent above the list of items.
1. Add an input above the tasks list with `<input [(ngModel)]="newTaskText"`>
1. Add an "Add Task" button with `(click)="onCreateNewTask(newTaskText)"`, assign click event to a new `onCreateNewTask(name: string)` method, and have it push a new task onto the `tasks` property.
1. Add a `<p>` tag that displays the total number of tasks with `<p>{{tasks.length}}</p>`.