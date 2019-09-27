class Person {

    constructor(age: number, eyeColor: string, hairColor: string, isEmployed?: boolean
    ) {
        this.age = age;
        this.eyeColor = eyeColor;
        this.hairColor = hairColor;
        this.isEmployed = isEmployed;
    }

    age: number;
    eyeColor: string;
    hairColor: string;
    isEmployed?: boolean;
}

class Doctor extends Person {

    // Be careful when writing function arguments; an optional argument *has* to be at the end of the function, but because we added the expertise argument, we should always double check that our function arguments line up because now the isEmployed argument is the 4th argument, not 3rd
    constructor(age: number, eyeColor: string, hairColor: string, expertise: string, isEmployed?: boolean) {
        super(age, eyeColor, hairColor, isEmployed);
        this.expertise = expertise;
    }

    expertise: string;
}

// Be careful when writing function arguments; an optional argument *has* to be at the end of the function, but because we added the expertise argument, we should always double check that our function arguments line up because now the isEmployed argument is the 4th argument, not 3rd
const doctor = new Doctor(47, 'brown', 'brown', 'cardiology', true);

console.log('Doctor:', doctor);