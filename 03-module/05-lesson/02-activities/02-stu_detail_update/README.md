# Instructions

- Inside `tasks.service.ts` file make the following changes:
    - Add `detailText` as an optional parameter in the `Task` class constructor.
    - Add `detailText` as an optional property in the `Task` class.
    - Alter the `addTask()` method within `TasksService` to take in `detail` and pass it into the new `Task` within the `addTask()` method.
- Inside the `add-tasks.component.ts` file make the following changes:
    - Create a new `const` called `detail` inside of the `onSubmit()` method that stores the value of the `detailText` from the form.
    - If the form status is valid, push a newly created task using the `title` and `detail` constants.
        - Don't forget we still need to pass `false` for the `completed` parameter.

    