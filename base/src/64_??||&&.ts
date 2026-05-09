// ?? → null/undefined のみデフォルト置換 (0や""は残す)
// || → falsy全部をデフォルト置換 (0, "", false も置換される)
// && → 左辺が truthy なら右辺。条件付き実行や存在チェックに使う

// ===== ?? vs || =====
const volume = 0
volume ?? 50 // 0  ← 0 は null/undefined ではないので残る
volume || 50 // 50 ← 0 は falsy なので右辺になる

// → デフォルト値の代入は ?? が安全
// → 0 や "" も「無効な値」として扱いたい時だけ ||

// ===== && =====
const user: { name: string } | null = { name: 'Alice' }

user && console.log(user.name) // user が truthy なら実行
// 現在は ?. が主流
console.log(user?.name) // user が null/undefined なら undefined を返す

// ===== まとめて使う実例 =====
type Config = {
  retries?: number
  user?: { name: string } | null
}

function setup(config: Config) {
  const retries = config.retries ?? 3 // 0 も有効な値として扱う
  console.log(`Hello ${config.user?.name ?? 'guest'}`) // 存在チェック + デフォルト
}
