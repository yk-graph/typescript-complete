/*
  - クラスのプロパティにアクセス修飾子をつけると、アクセスできる範囲を制限できる
  - public: クラスの外からアクセスできる（デフォルト）
  - private: クラスの外からアクセスできない
  - readonly: クラスの外からアクセスできるが、値を変更できない

  - static: クラスのインスタンスではなく、クラス自体に属するプロパティやメソッドを定義する ★ココでは記述しない
  - protected: クラスの外からアクセスできないが、継承したクラスからはアクセスできる ★ココでは記述しない
  - abstract: クラスを継承するためのクラスで、インスタンス化できない ★ココでは記述しない
*/

class Person {
  public name: string
  private age: number

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

const quill = new Person('Alice', 30)
quill.name // 'Alice'
// quill.age // プライベートプロパティなのでアクセスできない
quill.greeting() // Hello, my name is Alice and I am 30 years old.

/* ============== 省略できる ============== */

class Person2 {
  constructor(
    public name: string,
    private age: number,
  ) {}

  greeting(): void {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    )
  }
}

const quill2 = new Person2('Bob', 25)
quill2.name // 'Bob'

/* ============== readonly ============== */
class Person3 {
  constructor(
    public readonly name: string,
    private age: number,
    public phone: string,
  ) {}

  greeting(): void {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    )
  }

  increaseAge(): void {
    this.age++ // age は private なのでクラス内からアクセスできる
  }
}

const quill3 = new Person3('Charlie', 20, '123-456-7890')
// quill3.name = 'Dave' // エラー: name は readonly プロパティなので値を変更できない
quill3.phone = '111-222-3333' // phone は readonly ではないので値を変更できる
