Lesson Plan 9.5

Open the [slidedeck](https://docs.google.com/presentation/d/1iYok0c2RJXsPMM29tGC08TW39ww_so4lIRrHZiHx7ww/edit?usp=sharing) for this lesson.

## Dates with MomentJS (45 mins)

### The Why ( 5 min )

* Put simply, working with the built-in JS `Date()` object can be error-prone, buggy, and painful. If you have the option, you should (almost) always avoid using JS built-in `Date`s and instead use `MomentJS`, an open-source date library for JS/TS that fixes JavaScript's `Date` issues and adds many helpful functions.

#### Demo

* Walk through To-Do list with the MomentJS date functionality added.

### Instructor Do: MomentJS Basics ( 10-15 min )

File(s): `02-activities/03-inst_moment_basics`

* [MomentJS Docs](https://momentjs.com/docs/)

* Quickly run an `ng new` app for MomentJS demonstration (the act of generating a new app is a good opportunity to refresh/review for the students)

* `npm i moment` into the app

* Work in the `AppComponent` for the demonstration. Clear out an unnecessary boilerplate code.

* Add: `import * as moment from 'moment';`

    * The question of why it's *not* just `import { moment } from 'moment'` will probably come up.

    * Essentially, this package (along with others) isn't specifically built for an Angular app with TypeScript and Webpack, so sometimes the way it exports its variables and functions may not "match up" perfectly, per se.

    * Thus, for some packages, the above syntax will need to be used.

    * Don't spend much time on it though - it's not important. The students just need to know that that's the syntax for importing this package and the syntax may also have to be used for other third-party JS modules.

* Walk through examples:

```typescript
// Create a new moment.
// A moment without any arguments is immediately set to the current "moment", i.e. right now, this day/hour/minute/second/millisecond. A moment (JS) is a specific moment in time.
const firstDate = moment(); 
```

* A moment object should always stay as a moment object. To display its date in a string, we can call `.format()`

* Slack out docs: https://momentjs.com/docs/#/displaying/format/

* Walk through a few ways to format a moment into a string. Discuss the large tables on the above link with date display options such as:
`D, DD, DDD, DDDo, DDDD, d, dd, do, dddd, M, MM, MMM, MMMM, w, wo, YYYY,` 
and also time display options, such as:
`h, hh, k, kk, m, mm, s, ss,`
and lastly `x` for unix timestamp.

* Also walk through localized formats which are easy to quickly format into a pretty string, such as `l, ll, lll, llll, L, LL, LLL, and LLLL`.

```typescript
// Examples from the MomentJS docs:
firstDate.format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
firstDate.format("ddd, hA");                       // "Sun, 3PM"
```

* Change `firstDate` from a `const` in `ngOnInit` to a property on the class

* Display the moment in the template with `{{firstDate.format('LLLL)}}`

### Partners Do: Moment Basics ( 15 min )

File(s): `02-activities/04-stu_moment_basics/README.md`

* Create a new app with `ng new`
* Import MomentJS
* Create moments
* Format moments
* Display formatted moments using {{string interpolation}} in the `AppComponent`

### Instructor Review: Moment Basics ( 5 min )

File(s): `02-activities/04-stu_moment_basics/solved`

* Call on a few students to walk through what formats they created

### Instructor Do: Parsing Moments ( 5-10 min )

File(s): `02-activities/05-inst_parsing_moments`

* With the above `moment()`, not passing in any arguments sets the `moment` to now. But how do we set it for a different date/time?

* Pull up and slack out link: https://momentjs.com/docs/#/parsing/string-format/

```typescript
// yields the same moment
moment("12-25-1995", "MM-DD-YYYY");
moment("12/25/1995", "MM-DD-YYYY");
```

* Walk through inserting various date forms, such as MM, YYYY, x, and more

### Partners Do: Create Moments with Different Dates ( 10 min )

File(s): `02-activities/06-stu_create_moments/README.md`

* Create more moments with the functionality shown in class; see the docs

* Verify the moments parsed correctly by doing console logs with `isValid()`, such as `console.log('december moment', moment("12-25-1995", "MM-DD-YYYY").isValid())` or simply log the moment itself, add a breakpoint, and check the `__isValid` property in Chrome DevTools

### Instructor Review: Create Moments with Different Dates

File(s): `02-activities/06-stu_create_moments/complete`

---

## Break (5 mins)

---

## Getters + Setters and Manipulating Moments (45 minutes)

### Instructor Do: Get Moments ( 10 min )

* Explain that moments can be easily manipulated down to the millisecond. 

```typescript

moment().second(x: number); // Setter: sets the moment to x seconds
moment().second(); // Getter: Gets the moment's seconds

// can use an 's' at the end
moment().seconds(x: number); // Setter: sets the moment to x seconds
moment().seconds(); // Getter: Gets the moment's seconds

moment().minute(x: number); // Setter: sets the moment to x minutes
moment().minute(); // Getter: Gets the moment's minutes

// can use an 's' at the end
moment().minutes(x: number); // Setter: sets the moment to x minutes
moment().minutes(); // Getter: Gets the moment's minutes

moment().hour(x: number); // Setter: sets the moment to x hours
moment().hour(); // Getter: Gets the moment's hours

// can use an 's' at the end
moment().hours(x: number); // Setter: sets the moment to x hours
moment().hours(); // Getter: Gets the moment's hours

// can do the same above with months, days, years, and more
// https://momentjs.com/docs/#/get-set/month/
```

### Students Do: Getters + Setters ( 15 min )

File(s): `02-activities/07-stu_getters_setters/README.md`

* Create new moments and use the getters and setters to adjust the moments and get data from them.

* Set the results of GETs to string properties on the `AppComponent` and have them display in the template via string interpolation

* Also ensure that the `firstDate` property is still being displayed in the template via soomething like `{{firstDate.format('LLLL')}}`. Add a 2 second `setTimeout()` in `ngOnInit` to set the year to 1995, and notice that the displayed date will automatically update on the screen.

* Add a few buttons, create a few `onButtonClick()` methods, bind the (click) events to the created methods, and have the methods call setters on the moments

### Instructor Review: Getters + Setters ( 5 min )

File(s): `02-activities/07-stu_getters_setters/solved`

### Instructor Do: Manipulate Moments ( 5-10 min )

File(s): `02-activities/08-inst_manipulate_moments`

* Pull up and send out: https://momentjs.com/docs/#/manipulating/add/

* Add a few buttons onto the template, add an `onAddTime()` method, and have the method call `this.firstDate.add(7, 'days');`. 

* Ensure that `firstDate` is being displayed in the template as something like `{{firstDate.format('LLLL')}}`. 

* When the button is clicked, the moment will increase by 7 days.

* Adjust the `onAddTime()` method to add seconds, minutes, and days and demonstrate

* Repeat the same above with the `.subtract` method (identical parameters)

### Partner Do: Manipulate Moments( min )

File(s): `02-activities/09-stu_manipulate_moments/README.md`

- Ensure that firstDate is being displayed in the template as something like {{firstDate.format('LLLL')}}
- Add the following buttons:
    - Add 7 Days
        - on click calls the method `onAddDays()` and increases the date by 7 days.
    - Subtract 7 Days
        - on click calls the method `onSubtractDays()` and decreases the date by 7 days.
    - Add 1 Month
        - on click calls the method `onAddMonth()` and increase the date by 1 month.
    - Subtract 1 Month
        - on click calls the method `onSubtractMonth()` and decreases the date by 1 month.

### Instructor Review: Manipulate Moments ( 5 min )

File(s): `02-activities/09-stu_manipulate_moments/solved`

---

## Lunch (60 mins)

---

## Moment Queries + Adding to To-Do List (45 minutes)

### Instructor Do: Moment Queries ( 10 min )

File(s): `02-activities/10-inst_moment_queries`

* Moments can be "queried", i.e. we can ask it questions like "Is this before x date?"

* Pull up and send: https://momentjs.com/docs/#/query/is-before/

* Code through some of the below examples

```typescript
moment().isBefore(Moment|String|Number|Date|Array);
moment().isBefore(Moment|String|Number|Date|Array, String); //second parameter allows for higher granularity than just milliseconds. See docs for detailed use
moment('2010-10-20').isBefore('2010-12-31', 'year'); // false
moment('2010-10-20').isBefore('2011-01-01', 'year'); // true

moment().isSame(Moment|String|Number|Date|Array);
moment().isSame(Moment|String|Number|Date|Array, String); //second parameter allows for higher granularity than just milliseconds. See docs for detailed use

moment().isAfter(Moment|String|Number|Date|Array);
moment().isAfter(Moment|String|Number|Date|Array, String); //second parameter allows for higher granularity than just milliseconds. See docs for detailed use
moment('2010-10-20').isAfter('2010-10-19'); // true

moment().isSameOrBefore(Moment|String|Number|Date|Array);
moment('2010-10-20').isSameOrBefore('2010-10-21');  // true
moment('2010-10-20').isSameOrBefore('2010-10-20');  // true
moment('2010-10-20').isSameOrBefore('2010-10-19');  // false

moment('2010-10-20').isSameOrAfter('2010-10-19'); // true
moment('2010-10-20').isSameOrAfter('2010-10-20'); // true
moment('2010-10-20').isSameOrAfter('2010-10-21'); // false
```

* More than simply before/after, you can also check for between:

* https://momentjs.com/docs/#/query/is-between/

```typescript
moment('2010-10-20').isBetween('2010-01-01', '2012-01-01', 'year'); // false
moment('2010-10-20').isBetween('2009-12-31', '2012-01-01', 'year'); // true
```

### Partners Do: Moment Queries ( 10 min )

File(s): `02-activities/11-stu_moment_queries/README.md`

- Create two different moments:
- Check if moment 1 is between the years 2010 and 2012
- Check if moment 2 is between the years 2009 and 2013
- Check if moment 1 is before moment 2
- Check if moment 1 is after moment 2
- Check if moment 1 is the same as moment 2

Feel free to either use console logs or templates with string interpolation.

### Instructor Review: Moment Queries ( 5 min )

File(s): `02-activities/11-stu_moment_queries/solved`

### Instructor Do: Integrate into To-Do List ( 10 min )

File(s): `02-activities/12-inst_intergrate`

* Pull up the To-Do list app

* Adjust the task class to use a Moment for the due date. Example:

```typescript
// tasks.service.ts

import * as uuid from 'uuid';
import * as moment from 'moment';

export class Task {
  constructor(title: string, completed: boolean, detailText?: string, dueMoment?: moment.Moment) {
    this.title = title;
    this.completed = completed;
    this.detailText = detailText;

    this.dueMoment = dueMoment;
    this.createMoment = moment();
    this.taskId = uuid.v4(); //normally this would be generated by the server, but we'll generate it for example now
  }
  taskId: string;
  title: string;
  completed: boolean;

  detailText?: string;

  // add two moment properties for create and due dates/times
  createMoment: moment.Moment;
  dueMoment: moment.Moment;
}
```

* Notice that we defined the types of the `createMoment` and `dueMoment` properties as `moment.Moment`. This is because the `interface` for the moment object is accessed by `moment.Moment` (capital M moment). This is one of the few clases where this will have to be done

* The `dueMoment` is passed into the constructor arguments, and the `createMoment()` is assigned to now with `moment()`.

### Partners Do: Integrate into To-Do List ( 10 min )

File(s): `02-activities/13-stu_integrate/README.md`

* Adjust the Task class as shown in class to use `moments` for the create date and due date.

### Instructor Do: Review ( 5 min )

File(s): `02-activities/13-stu_integrate/solved`

---

## Break (5 mins)

---

## Moments in To-Do List (45 minutes)

### Instructor Do: Adjust Service and Template ( 10 min )

File(s): `02-activities/14-inst_moment_todo`

* Update the `TaskService` `addTask()`:

```typescript
//tasks.service.ts

addTask(title: string, completed: boolean, detailText?: string, dueMoment?: moment.Moment) {
    const newTask = new Task(title, completed, detailText, dueMoment);
    this.tasks.push(newTask);
    console.log('New task added', newTask)
  }
``` 

* Update the `AddTaskComponent` method call for `onSubmit()`:

```typescript
//add-task.component.ts

import * as moment from 'moment';

 onSubmit() {
    const title = this.taskForm.value.title;
    const detailText = this.taskForm.value.detailText;
    const dueMoment: moment.Moment = this.taskForm.value.dueDate;
    this.tasksService.addTask(title, false, detailText, dueMoment)
    this.onResetForm();
  }
```

### Partner Do: Adjust TaskService and AddTaskComponent to Use Moment ( 15 min )

File(s): `02-activities/15-stu_moment_todo/README.md`

* Integrate moments into the TaskService and the AddTaskComponent, as shown in class.

### Instructor Do: Display Moment in ListComponent ( 15 min )

File(s): `02-activities/16-inst_display_moment`

* Discuss Angular pipes:

  * With string interpolation, the string is "piped" through the pipe and the result is displayed, to do things like adjusting capitalization on a string. We can also do this with dates, like in `moment().format()`.

* Pull up and send out: https://angular.io/api/common/DatePipe

* In the detail view of the `ListComponent`, add lines to display the create date ad due date:

```typescript
<h5>Due: {{taskBeingDisplayed.dueMoment | date: 'shortDate'}}</h5>
<h5>Created: {{taskBeingDisplayed.createMoment | date: 'shortDate'}}</h5>
```

### Partner Do: Display Date on ListComponent Detail View with Angular Date Pipe ( min )

File(s): `02-activities/17-stu_display_moment/README.md`

* Replicate adding `Due` and `Created` date with moment using the Angular date pipe.

### Instructor Do: Review ( 5 min )

File(s): `02-activities/17-stu_display_moment/solved`

---

© 2019 Trilogy Education Services

[i_do]: https://github.com/coding-boot-camp/Java-6-module/blob/master/id_resources/icons/i_do/res/mipmap-hdpi/i_do.png "Instructor do"

[we_do]: https://github.com/coding-boot-camp/Java-6-module/blob/master/id_resources/icons/we_do/res/mipmap-hdpi/we_do.png "We Do"

[you_do]: https://github.com/coding-boot-camp/Java-6-module/blob/master/id_resources/icons/you_do/res/mipmap-hdpi/you_do.png "Student Do"

[assess]: https://github.com/coding-boot-camp/Java-6-module/blob/master/id_resources/icons/assess/res/mipmap-hdpi/assess.png "Assessment"

[break]: https://github.com/coding-boot-camp/Java-6-module/blob/master/id_resources/icons/break/res/mipmap-hdpi/break.png "Break"

[warn]: https://github.com/coding-boot-camp/Java-6-module/blob/master/id_resources/icons/warn/res/mipmap-hdpi/warn.png "Warning"