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