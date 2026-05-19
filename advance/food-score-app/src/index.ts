import { foodItems } from './food-item.js'
import { FoodRepository } from './food-repository.js'
import { FoodRenderer } from './food-renderer.js'
import { ScoreStore } from './score-store.js'
import { ScoreRenderer } from './score-renderer.js'

// 責務: 各クラスを組み立てて起動するだけ（エントリーポイント）
// 「誰が何をするか」の接続はここで行い、各クラスには持ち込まない
window.addEventListener('DOMContentLoaded', () => {
  // ===== 型アサーション as (65_as_assertion.ts) =====
  // getElementById の戻り値は HTMLElement | null
  // HTML を見れば要素の種類が分かるので、具体的な型にアサーションする
  // | null を残しているのは「見つからない可能性」をあえて残して次の null チェックにつなげるため
  const goodFoodElement = document.getElementById('good-foods') as HTMLUListElement | null
  const badFoodElement = document.getElementById('bad-foods') as HTMLUListElement | null
  const scoreElement = document.getElementById('score') as HTMLDivElement | null

  // ===== null チェック（早期リターン） =====
  // ローカル変数に入れているので、if で絞り込んだあとは各型として確定する
  // （class のプロパティ this.xxx だと絞り込めない問題を回避している）
  // 必要な要素をまとめて1行でチェックして、どれか1つでも null なら即終了
  if (!goodFoodElement || !badFoodElement || !scoreElement) return

  // ===== Singleton (46_singleton.ts) =====
  // ScoreStore は new せずに getInstance() で取得する
  // アプリ全体で同じインスタンスを共有するための仕組み
  const scoreStore = ScoreStore.getInstance()
  const scoreRenderer = new ScoreRenderer(scoreElement, scoreStore)

  const foodRepository = new FoodRepository(foodItems)
  const foodRenderer = new FoodRenderer(
    foodRepository,
    goodFoodElement,
    badFoodElement,
    // ===== コールバック関数 =====
    // 食品がクリックされたときの処理を FoodRenderer に渡す
    // FoodRenderer はこの中身を知らず「クリックされたら呼ぶ」だけ
    // 処理の順番がここで一目でわかるのが、コールバックで切り出す利点
    (food) => {
      scoreStore.toggleItem(food) // 1. Store のスコアを更新
      scoreRenderer.render() // 2. 画面のスコアを再描画
    },
  )

  foodRenderer.render()
  scoreRenderer.render()
})
