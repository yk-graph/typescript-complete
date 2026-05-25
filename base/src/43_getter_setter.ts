/* getter / setter
   - クラスのプロパティにアクセスする際に、追加のロジックを挟める仕組み
   - getter: プロパティの値を「取得」するときに実行される
   - setter: プロパティの値を「設定」するときに実行される
   - 呼び出し側はメソッドではなくプロパティとして扱えるため、自然な書き方ができる

   - getter / setter の使いどころ
     private なプロパティに対して「値の取得・設定時に必ずバリデーションを通らせたい」場合に使う
     直接プロパティを変更させず、条件や処理を挟むことができる（private と目的が似ている）
*/

class Teacher {
  constructor(
    public name: string,
    private _subject: string, // private にして外から直接変更させない（慣習的に _ をつける）
  ) {}

  // getter: teacher.subject と書くだけで実行される
  get subject() {
    if (!this._subject) {
      throw new Error('教科が設定されていません')
    }
    return this._subject
  }

  // setter: teacher.subject = '値' と書くだけで実行される
  set subject(value: string) {
    if (!value) {
      throw new Error('教科を空にすることはできません')
    }
    this._subject = value
  }
}

const teacher = new Teacher('Charlie', 'Math')

// getter が実行される（メソッドのように () をつけなくていい）
console.log(teacher.subject) // ✅ 'Math'

// setter が実行される（代入するだけでバリデーションが走る）
teacher.subject = 'Science' // ✅ バリデーションを通って '_subject' が更新される
teacher.subject = '' // ❌ Error: 教科を空にすることはできません

// private なので外から直接変更することはできない
// teacher._subject = 'Math' // ❌ private なのでアクセスできない
