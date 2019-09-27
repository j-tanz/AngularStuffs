class Animal {

    constructor(name: string) {
        this.name = name;
    }

    name: string;
    numLegs: number = 4;
}

class Dog extends Animal {

    constructor(name: string, breed: string, isChipped?: boolean) {
        super(name);
        this.breed = breed;

        if (isChipped !== undefined) {
            this.isChipped = isChipped;
        }
        // If you wish, you can eliminate the if statement and just have `this.isChipped = isChipped;`
        // Why? Because this.isChipped (the class property) is already undefined at the beginning because it's optional and hasn't been defined.
        // If isChipped (the argument) is undefined, then technically you're just assigning this.isChipped to be undefined, and it's already undefined.
    }
    breed: string;
    isChipped?: boolean;
}

const dog1 = new Dog("Devo", "Lab", true);
const dog2 = new Dog("Spot", "Husky"); // due to the optional 3rd argument, we have the option of including it or not


console.log(`dog1 - isChipped is true`, dog1)
console.log(`dog2 - isChipped is not defined`, dog2)