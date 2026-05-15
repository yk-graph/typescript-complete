/* アクセス修飾子
   - public  : デフォルトの状態。クラスの外からも自由にアクセス・変更できる
   - private : クラスの内側からしかアクセスできない。外から直接値を変更させたくないときに使う
   - readonly: 外からアクセスはできるが、初期化後に値を変更できない。変わってほしくない値を守るときに使う
*/

class BankAccount {
  constructor(
    public readonly owner: string, // 口座名義は変更不可
    private balance: number, // 残高は外から直接変更させない
    public accountType: string, // 口座種別は外から変更できる
  ) {}

  deposit(amount: number): void {
    if (amount <= 0) {
      console.log('❌ 0円以下は入金できません')
      return
    }
    this.balance += amount
    console.log(`✅ ${amount}円入金しました。残高: ${this.balance}円`)
  }

  withdraw(amount: number): void {
    if (amount > this.balance) {
      console.log('❌ 残高が不足しています')
      return
    }
    this.balance -= amount
    console.log(`✅ ${amount}円出金しました。残高: ${this.balance}円`)
  }
}

const account = new BankAccount('Alice', 1000, '普通預金')

/* readonly
  IDや名前など「作成後に絶対変わってほしくない値」を守るために使う
  間違って上書きするコードを書いてしまったときにコンパイルエラーで気づける
*/
console.log(account.owner) // ✅ 'Alice'
account.owner = 'Bob' // ❌ readonly なので変更できない

account.accountType = '定期預金' // ✅ public なので変更できる

/* private
  外から直接値を変更させたくないが、クラス内のメソッド経由なら変更を許可したい場合に使う
  「値を変更できる条件や処理」をクラス内に閉じ込めることができる
*/
account.deposit(500) // ✅ 500円入金しました。残高: 1500円
account.withdraw(2000) // ❌ 残高が不足しています
account.balance = 10000000 // ❌ private なので外から直接変更できない
