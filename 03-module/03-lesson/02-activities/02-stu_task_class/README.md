# Instructions

For this activity, start by using the to-do list application code that you have from the previous class.

Create a `Task` class within your `tasks.service.ts`:

* Include the following properties:
  - title which holds a string
  - completed which holds a boolean 
* Include a constructor that takes in title and completed.
* Convert the `tasks` property of the `TasksService` class to hold `Task` objects instead and construct three objects in the array.
* Update your `addTask` and `getTasks` methods to work with your new `Task` objects.