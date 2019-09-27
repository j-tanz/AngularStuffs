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
