/*
  - extends を使用してクラスを継承することができる
    - 継承したクラスは、親クラスのプロパティやメソッドを使用することができる
    - 継承したクラスは、親クラスのプロパティやメソッドをオーバーライドすることができる
    - 継承したクラスは、親クラスのコンストラクタを呼び出すために super を定義する必要がある
  - protected アクセス修飾子を使用することで、継承したクラスからアクセスできるプロパティやメソッドを定義することができる
    - protected: クラスの外からアクセスできないが、継承したクラスからはアクセスできる
  - abstract クラスを定義することができる
    - abstract クラスは、継承するためのクラスで、インスタンス化できない
    - abstract クラスは、抽象メソッドを定義することができる
    - 抽象メソッドは、継承したクラスで実装する必要がある
*/

class Person {
  constructor(
    public name: string,
    protected age: number,
  ) {}

  greeting(): void {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    )
  }
}

// Person クラスを継承して Teacher クラスを定義 | 新たに subject プロパティを追加する場合
class Teacher extends Person {
  constructor(
    name: string,
    age: number,
    public subject: string,
  ) {
    super(name, age) // 親クラスのコンストラクタを呼び出すために super を定義しないとエラーになる
  }
}

const teacher = new Teacher('Charlie', 40, 'Math')
teacher.greeting() // Hello, my name is Charlie, I am 40 years old and I teach Math.
// teacher.age // protected プロパティなのでアクセスできない
