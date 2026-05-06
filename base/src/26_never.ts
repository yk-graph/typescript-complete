// never型とは: 「決して起こらない」を表す型
// 実務で never を明示的に書くパターンは大きく2つだけ

// ===== パターン①: 関数の戻り値に never =====
// 「正常に return しない関数」を表現する(throw する / 無限ループする)
function throwError(message: string): never {
  throw new Error(message)
}

// 用途: エラー処理を関数に切り出す時、TS に「この先は実行されない」と伝えられる
function getUser(id: string | null) {
  if (!id) throwError('idが必要です')
  return id.toUpperCase() // ✅ id は string と推論される(null は除外済み)
}

// ===== パターン②: 変数の型に never(網羅性チェック) =====
// ユニオン型の switch で、case漏れをコンパイル時に検出する
type Status = 'pending' | 'success' | 'error'

function handleStatus(status: Status): string {
  switch (status) {
    case 'pending':
      return '処理中'
    case 'success':
      return '成功'
    case 'error':
      return '失敗'
    default:
      // ここに到達した時点で status は never 型のはず
      const _exhaustive: never = status
      throw new Error(`未対応: ${status}`)
  }
}

// 後で Status に値を追加した時の挙動:
// type Status = "pending" | "success" | "error" | "canceled"
// → default の `_exhaustive: never = status` でコンパイルエラー
// → 「canceled の case を書き忘れてるよ」と TS が教えてくれる

/* 解説
  実務で never を明示するのはこの2パターン:
    ①  関数の戻り値 : never  → 例外を投げる/戻らない関数
    ②  変数の型     : never  → switch の網羅性チェック

  ①は「この関数は戻ってこない」という宣言。
  ②は「ここには絶対こないはず」を型で保証する仕組み。
  どちらも目的は同じで、「ありえないこと」を型システムに伝えるための道具。
*/
