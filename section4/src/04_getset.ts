/*
  - getters と setters を使用して、クラスのプロパティにアクセスする方法
    - getter と setter は TypeScript の機能ではなく JavaScript の機能であるため、TypeScript でも同様に使用できる
    - getter はプロパティの値を取得するためのメソッド
    - setter はプロパティの値を設定するためのメソッド
    - getter と setter を使用することで、プロパティの値を取得したり設定したりする際に、追加のロジックを実行することができる
*/

class Person {
  constructor(
    public name: string,
    private age: number,
  ) {}

  greeting(this: Person): void {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    )
  }
}

class Teacher extends Person {
  get subject() {
    if (!this._subject) {
      throw new Error('Subject is not defined')
    }
    return this._subject
  }

  set subject(value: string) {
    if (!value) {
      throw new Error('Subject cannot be empty')
    }
    this._subject = value
  }

  constructor(
    name: string,
    age: number,
    private _subject: string,
  ) {
    super(name, age)
  }
}

const teacher = new Teacher('Charlie', 40, 'Math')
teacher.greeting() // Hello, my name is Charlie and I am 40 years old.
console.log(teacher.subject) // Math
teacher.subject = 'Science'
console.log(teacher.subject) // Science
