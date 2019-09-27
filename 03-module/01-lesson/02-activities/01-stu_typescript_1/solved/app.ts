/// !!!AntiPattern - Do Not Do
// `String` (first letter capitalized) is the built-in JavaScript prototype, while `string` (lowercase) is the TypeScript type.
// Lowercase `string` is used in TypeScript; capitalize S `String` should never be used
var tvShowIncorrectString: String = "The Office";
/// !!!AntiPattern - Do Not Do

// the correct type assignment is with a lowercase `string`
var tvShowCorrect: string = "The Office";

// const and let
const MY_TOKEN: string = "xyz123456";
MY_TOKEN = "654321xyz"; // Error: Cannot assign to 'test' because it is a constant.

const YEAR_FOUNDED = 1776;
YEAR_FOUNDED = 1778; // Error: Cannot assign to 'YEAR_FOUNDED' because it is a constant.

// let is just like var, but is block-scoped instead of function-scoped.
// You don't need to worry about what this means too much, as you'll use `let` almost exclusively
let dayOfYear = 124;
dayOfYear = 139; // valid; let can be reassigned


// Activity

const YEAR_ZOO_FOUNDED = 1998;
let numEmployees: number = 287;

const CITY: string = "Denver";
const STATE = "Colorado";
let zooName = "Denver Zoo";

zooName = "Zoo of Denver";

zooName = 12; // error; cannot assign number to string variable

numEmployees = "a lot"; // error; cannot assign string to number variable

YEAR_ZOO_FOUNDED = 1996; // error: cannot reassign const

let animal = {
    numLegs: 4,
    heightFt: 2,
    heightIn: 6,
    weight: 75,
    name: "Terry"
}

animal.age = 12; // error: Property 'age' does not exist on type '{ numLegs: number; heightFt: number; heightIn: number; weight: number; name: string; }'
// To do this, let's look at classes and interfaces

//Bonus: Skim over TypeScript's documentation on [classes](https://www.typescriptlang.org/docs/handbook/classes.html) and [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html).
