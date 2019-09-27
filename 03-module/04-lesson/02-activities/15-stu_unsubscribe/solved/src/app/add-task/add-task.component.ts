import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, OnDestroy {

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    detailText: ['']
})

valueChangeSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService
    ) { }

  ngOnInit() {
    // set up an observable to log value changes
    this.valueChangeSub = this.taskForm.valueChanges.subscribe(
      (res: any) => {
        console.log('Form', this.taskForm);
        console.log('Form Value Changed', res);

      },
      err => { console.error(err); },
      () => { }
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    // Observables must always be unsubscribed from! Here's a simple way to do so.
    if (this.valueChangeSub) {
      this.valueChangeSub.unsubscribe();
    }
  }

  onSubmit() {
    const title = this.taskForm.value.title;
    this.tasksService.addTask(title, false)
  }

  onPatchSampleText() {
    // you could also patch title: "text" onto this Object, but the intent with these functions is to show that setValue overwrites, while patchvalue just updates the form
    this.taskForm.patchValue({
      detailText: "Sample detail text!\nHere's a new line."
    })
  }

  onSetSampleText() {
    // you could also patch title: "text" onto this Object, but the intent with these functions is to show that setValue must take in *all* of the form controls to overwrite the whole form.
    this.taskForm.setValue({
      title: "New setValue() title",
      detailText: "Sample .setValue() text! Notice that setValue() overwrites the whole form, requiring every FormControl to be set to a value."
    })
  }
  onResetForm() {
    this.taskForm.reset();
  }
}
