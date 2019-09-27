# Get to Know TypeScript

## Instructions

You are writing code to manage a zoo. In the [TypeScript Playground](https://www.typescriptlang.org/play/):
1. Create a few strongly-typed variables that you would need to store general data about the zoo, such as number of animals, number of employees, name of the zoo, city, and state. For each number and string variable, create explicitly-typed and implicity-typed versions.
2. In your code, try assigning a number value to a string variable. Note that TS catches this error with a red underline.
3. In your code, try assigning a string value to a number variable. Note that TS catches this error with a red underline.
4. Change a few variables to `const` and `let` instead of `var`. Try reassigning a `const` to a different primitive property (to a `string` or `number`) and note the error TypeScript gives you.
5. Create an object of an animal of your choosing with the `let` keyword, and assign to it a few properties, such as `numberOfLegs`, `heightFeet`, `heightInches`, `weight`, and `name`.
6. On a separate line, try to add a new property to the animal object you created. Note that TS marks this as an error. Hover over the variable with your cursor to see what type TS infers the variable to be.
7. If time permits, skim over TypeScript's documentation on [classes](https://www.typescriptlang.org/docs/handbook/classes.html) and [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html).