// non-null assertion !: 「この値は null/undefined ではない」と TS に教える演算子
// ※ 実行時のチェックではなく、型チェックを通すだけ。乱用は危険

// ===== 実践例① DOM要素が存在することが確実な時 =====
// getElementById の戻り値は HTMLElement | null
// 必ず存在するページなら ! で null を除外できる
const input = document.getElementById('username')! // 型: HTMLElement
console.log(input.id) // ✅ null チェック不要で使える

// ! を使わない場合は毎回 null チェックが必要
const input2 = document.getElementById('username')
console.log(input2?.id) // オプショナルチェーン
// または: if (input2) { console.log(input2.id) }

// ===== 実践例② Array.find の結果を使いたい時 =====
// find の戻り値は T | undefined
// 確実に見つかると分かっている場合
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]
const alice = users.find((u) => u.id === 1)! // 型: { id, name }
console.log(alice.name) // ✅ undefined チェック不要

/* 解説
  使いどころ:
    - DOM要素が確実に存在する時 (getElementById の結果など)
    - find / Map.get など T | undefined を返すAPIで、絶対にあると分かる時
    - クラスプロパティを後から初期化する時 (! でTSの初期化チェックを回避)

  注意:
    - ! は「TSを黙らせる」だけで、実行時に null/undefined なら普通にエラーになる
    - 可能なら if 文やオプショナルチェーン (?.) で安全に扱う方が良い
    - 「絶対に存在する」と確信できる場面以外では使わない
*/
