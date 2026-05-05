/*
  - thisは、関数が呼び出されたときのコンテキストを指す特殊なキーワード
  - クラスやオブジェクトのメソッド内で、現在のインスタンスを参照するために使用される
  - thisの値は、関数がどのように呼び出されたかによって決まる
    - クラスのメソッド内でthisを使用すると、そのクラスのインスタンスを指す
    - 関数がオブジェクトのメソッドとして呼び出された場合、thisはそのオブジェクトを指す
    - 関数が単独で呼び出された場合、thisはグローバルオブジェクトを指す（strict modeではundefined）
  - 対策A ： アロー関数は、thisを定義された場所のコンテキストにバインドするため、通常の関数とは異なる挙動をする
  - 対策B ： 関数の第一引数にthisの型を指定することで、thisの型安全性を確保できる
*/

class Person1 {
  name: string
  age: number

  constructor(initName: string, initAge: number) {
    this.name = initName
    this.age = initAge
  }

  greeting(): void {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    )
  }
}

const quill = new Person1('Alice', 30)
// これは this.name と this.age が undefined になる
const anotherQuill = {
  greeting: quill.greeting,
}
anotherQuill.greeting() // Hello, my name is undefined and I am undefined years old.

/* =============　アロー関数を使用 =============== */

class Person2 {
  name: string
  age: number

  constructor(initName: string, initAge: number) {
    this.name = initName
    this.age = initAge
  }

  greeting = (): void => {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    )
  }
}

const quill2 = new Person2('Bob', 25)
// Person2の greeting はアロー関数で定義されているため、this は Person2 のインスタンスを指す
const anotherQuill2 = {
  greeting: quill2.greeting,
}
anotherQuill2.greeting() // Hello, my name is Bob and I am 25 years old.

/* =============　第一引数に this を指定 =============== */

class Person3 {
  name: string
  age: number

  constructor(initName: string, initAge: number) {
    this.name = initName
    this.age = initAge
  }

  greeting(this: Person3): void {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    )
  }
}

const quill3 = new Person3('Charlie', 40)
const anotherQuill3 = {
  name: quill3.name,
  age: quill3.age,
  greeting: quill3.greeting,
}
anotherQuill3.greeting()
