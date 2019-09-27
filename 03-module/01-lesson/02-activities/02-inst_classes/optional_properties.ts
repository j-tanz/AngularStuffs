class Animal {

    constructor(name: string) {
        this.name = name;
    }
  
    name: string;
    numLegs: number = 4;
}
  
class Dog extends Animal {
  
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
    breed: string;
    isChipped?: boolean;
  }
  
  const dog = new Dog("Devo", "Lab");
  dog.isChipped = true; // an optional property is an appropriate time to not assign it in the constructor function, since it is, of course, *optional*