/* static
   - クラスのインスタンスではなく、クラス自体に属するプロパティやメソッドを定義する
   - インスタンスを作成しなくても、クラス名から直接アクセスできる
   - JavaScript の Math.random() や Math.floor() も static メソッドの一例
     → new Math() とせずに Math.random() と書けるのはそのため
*/

// Math と同じように new せずに使えるユーティリティクラス
class StringHelper {
  static trim(value: string): string {
    return value.trim()
  }

  static isEmpty(value: string): boolean {
    return value.trim().length === 0
  }
}

// new StringHelper() とせずに直接使える
console.log(StringHelper.trim('  Hello  ')) // ✅ 'Hello'
console.log(StringHelper.isEmpty('  ')) // ✅ true
console.log(StringHelper.isEmpty('Hello')) // ✅ false

/* static の使いどころ
   - インスタンスの状態に依存しない処理（バリデーション・フォーマットなど）をまとめたい場合
   - new するまでもない、ただ呼び出したいだけの処理をまとめたい場合
*/

class ValidationHelper {
  static isEmail(value: string): boolean {
    return value.includes('@')
  }

  static isPhoneNumber(value: string): boolean {
    return /^\d{10,11}$/.test(value)
  }
}

console.log(ValidationHelper.isEmail('test@example.com')) // ✅ true
console.log(ValidationHelper.isEmail('test')) // ✅ false
console.log(ValidationHelper.isPhoneNumber('09012345678')) // ✅ true
