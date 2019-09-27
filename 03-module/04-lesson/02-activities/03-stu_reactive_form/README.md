# Activity: Reactive Form

## Instructions:

In the same way that was shown in class, go through the motions of creating a reactive form.

1. Import `ReactiveFormsModule` into AppModule
1. Inject `private fb: FormBuilder` into the constructor of the add-task component.
1. Create a `taskForm` property.
1. Create a form element with an input. Remember to hook this form into `taskForm` by adding [formGroup]="taskForm".
1. Add a submit button and remember to add [ngSubmit]="onSubmit()". Remember, we haven't created the `onSubmit` method yet!
