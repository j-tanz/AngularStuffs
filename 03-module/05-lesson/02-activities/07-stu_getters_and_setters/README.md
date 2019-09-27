# Instructions

* Create new moments and use the getters and setters to adjust the moments and get data from them.

* Set the results of GETs to string properties on the `AppComponent` and have them display in the template via string interpolation

* Also ensure that the `firstDate` property is still being displayed in the template via soomething like `{{firstDate.format('LLLL')}}`. Add a 2 second `setTimeout()` in `ngOnInit` to set the year to 1995, and notice that the displayed date will automatically update on the screen.

* Add a few buttons, create a few `onButtonClick()` methods, bind the (click) events to the created methods, and have the methods call setters on the moments