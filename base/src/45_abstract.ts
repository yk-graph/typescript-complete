/* abstract（抽象クラス）
   - 継承されることを前提としたクラス。直接インスタンス化できない
   - 抽象メソッドを定義することで「継承先で必ず実装しなければならないメソッド」を強制できる
   - 共通の処理は親クラスにまとめつつ、継承先ごとに異なる処理を強制したいときに使う
*/

abstract class Notification {
  constructor(protected message: string) {}

  // 抽象メソッド: 継承先で必ず実装しなければならない
  abstract send(): void

  // 共通の処理は親クラスにまとめられる
  validate(): boolean {
    if (!this.message) {
      console.log('❌ メッセージが空です')
      return false
    }
    return true
  }
}

// メール通知
class EmailNotification extends Notification {
  constructor(
    message: string,
    private email: string,
  ) {
    super(message)
  }

  // 継承先で send() を実装しないとエラーになる
  send(): void {
    if (!this.validate()) return
    console.log(`📧 ${this.email} にメールを送信しました: ${this.message}`)
  }
}

// Slack 通知
class SlackNotification extends Notification {
  constructor(
    message: string,
    private channel: string,
  ) {
    super(message)
  }

  send(): void {
    if (!this.validate()) return
    console.log(`💬 #${this.channel} に Slack を送信しました: ${this.message}`)
  }
}

const email = new EmailNotification('本日のミーティングは15時です', 'alice@example.com')
const slack = new SlackNotification('本日のミーティングは15時です', 'general')

email.send() // ✅ 📧 alice@example.com にメールを送信しました: 本日のミーティングは15時です
slack.send() // ✅ 💬 #general に Slack を送信しました: 本日のミーティングは15時です

// new Notification() // ❌ 抽象クラスは直接インスタンス化できない
// email.message // ❌ protected なプロパティにはクラス外からアクセスできない
// slack.message // ❌ protected なプロパティにはクラス外からアクセスできない

/* どのように使うべきか
   - 複数のクラスに共通の処理がある → 親クラスにまとめる（通常の継承でも可）
   - さらに「特定のメソッドは必ず継承先で実装させたい」→ abstract を使う
   - 逆に共通処理もなく、実装の強制だけしたい場合は interface の方が適している
*/
