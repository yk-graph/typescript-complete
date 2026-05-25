/* Singleton パターン
   - アプリケーション全体でインスタンスが必ず1つしか存在しないことを保証する設計パターン
   - 同じ設定や状態をアプリ全体で共有したいときに使う
   - private constructor にすることで、外から new できないようにする
*/

class AppConfig {
  private static instance: AppConfig

  // private constructor: コンストラクタ自体を外から呼べなくする
  // public readonly apiUrl: constructor が private でも、プロパティは外から読める
  // → private はコンストラクタへのアクセス制限、public はプロパティへのアクセス許可で別の意味
  private constructor(
    public readonly apiUrl: string,
    public readonly appName: string,
  ) {}

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig('https://api.example.com', 'MyApp')
    }
    return AppConfig.instance
  }
}

// new AppConfig() // ❌ private constructor なので外から new できない
const config1 = AppConfig.getInstance() // ✅ getInstance() を通じてインスタンスを取得。初回は新しいインスタンスが作られる
const config2 = AppConfig.getInstance()

// 一見 2 つのインスタンスを作っているように見えるが、 getInstance() は既にインスタンスが存在する場合はそれを返すため、 config1 と config2 は同じインスタンスを参照している
console.log(config1 === config2) // ✅ true（同じインスタンス）
console.log(config1.apiUrl) // ✅ 'https://api.example.com'
console.log(config2.apiUrl) // ✅ 'https://api.example.com'（config1 と同じインスタンスなので当然同じ値）

/* 実践的な例: ログ管理
   - ログの記録をアプリ全体で1つのインスタンスで管理する
   - 複数のインスタンスが存在するとログが分散してしまうため Singleton が適している
*/

class Logger {
  private static instance: Logger // step1: クラス内に static (new しなくても class 自体のプロパティとして持てる) な instance プロパティを定義
  private logs: string[] = [] // step2: ログを保存するための配列を private (class 内でのみアクセス可能 / 外からはアクセスできない) に定義

  private constructor() {} // step3: constructor を private にして、外から new できないようにする

  static getInstance(): Logger {
    if (!Logger.instance) {
      // step4: getInstance() メソッドを定義し、 instance が存在しない場合は新しく作成して instance に保存する
      Logger.instance = new Logger()
    }
    return Logger.instance // step5: instance を返す。これにより、 getInstance() を呼ぶたびに同じインスタンスが返されることになる
  }

  log(message: string): void {
    const timestamp = new Date().toISOString()
    this.logs.push(`[${timestamp}] ${message}`)
    console.log(`[${timestamp}] ${message}`)
  }

  getLogs(): string[] {
    return this.logs
  }
}

// logger1 と logger2 は別の変数だが、中身は同じインスタンスを指している
// つまり logger1 で記録したログは logger2 からも参照できる
const logger1 = Logger.getInstance()
const logger2 = Logger.getInstance()

logger1.log('ユーザーがログインしました')
logger2.log('商品を購入しました')

// logger1 と logger2 は同じインスタンスなので、どちらから getLogs() を呼んでも同じ結果になる
console.log(logger1.getLogs()) // ✅ ['ユーザーがログインしました', '商品を購入しました']
console.log(logger2.getLogs()) // ✅ ['ユーザーがログインしました', '商品を購入しました']
console.log(logger1 === logger2) // ✅ true（同じインスタンス）

/* どのように使うべきか
   - ✅ 向いているケース
     - アプリ全体で共通の設定を管理したい（環境変数、API エンドポイントなど）
     - ログやキャッシュなど、1つに集約すべき状態を管理したい
   - ❌ 向いていないケース
     - ユーザーや商品など、複数のインスタンスが必要なデータ
     - テストごとに状態をリセットしたい場合（Singleton は状態を引き継ぐため、テストしにくい）
*/
