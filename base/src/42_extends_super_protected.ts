/* 継承（extends）
   - 既存のクラスをベースに新しいクラスを定義する仕組み
   - 親クラスのプロパティやメソッドをそのまま引き継げる
   - 共通の処理を親クラスにまとめることで、コードの重複を避けられる
*/

class Person {
  constructor(
    public name: string,
    protected age: number, // 継承先からアクセスできる
    private salary: number, // 継承先からもアクセスできない
  ) {}

  greeting(): void {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
  }
}

/* private vs protected
   - private  : クラスの内側からのみアクセスできる。継承先からもアクセスできない
   - protected: クラスの外からはアクセスできないが、継承先からはアクセスできる
*/

class Teacher extends Person {
  showInfo(): void {
    console.log(this.age) // ✅ protected なので継承先からアクセスできる
    // console.log(this.salary) // ❌ private なので継承先からもアクセスできない
  }
}

const teacher = new Teacher('Charlie', 40, 300000)
// teacher.age // ❌ protected なのでクラスの外からはアクセスできない
// teacher.salary // ❌ private なのでクラスの外からはアクセスできない
teacher.showInfo() // ✅ 40

/* super
   - 継承先のコンストラクタで、親クラスのコンストラクタを呼び出すキーワード
   - 継承先で constructor を定義する場合は必ず super() を呼び出す必要がある
   - 親クラスが受け取る引数をそのまま super() に渡すことで、親クラスの初期化処理を実行できる
*/

class Teacher2 extends Person {
  constructor(
    name: string,
    age: number,
    salary: number,
    public subject: string,
  ) {
    super(name, age, salary) // 親クラス（Person）のコンストラクタを呼び出す
  }
}

const teacher2 = new Teacher2('Charlie', 40, 300000, 'Math')
teacher2.greeting() // ✅ 親クラスのメソッドをそのまま使える
console.log(teacher2.subject) // ✅ 'Math'

/* オーバーライド
  - 親クラスのメソッドを継承先で上書きできる
  - override キーワードをつけることで「意図的に上書きしている」ことを明示できる
  - 安全性のメリット：
    親クラスのメソッド名が変わった・削除された場合 override なしだと気づかず別メソッドとして残ってしまう（バグの温床）
    override ありだと TypeScript　がコンパイルエラーで教えてくれる
*/

class Student extends Person {
  constructor(
    name: string,
    age: number,
    salary: number,
    public grade: number,
  ) {
    super(name, age, salary)
  }

  override greeting(): void {
    console.log(`こんにちは、${this.name}です。${this.grade}年生です。`)
  }
}

const student = new Student('Alice', 15, 0, 2)
student.greeting() // ✅ こんにちは、Aliceです。2年生です。（上書きされた内容が実行される）
