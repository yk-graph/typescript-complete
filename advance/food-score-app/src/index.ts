import { foodItems } from './food-item.js'
import { FoodRepository } from './food-repository.js'
import { FoodRenderer } from './food-renderer.js'

// このファイルの責務: 各クラスを組み立てて起動するだけ（エントリーポイント）
// データ取得・画面描画のロジックはそれぞれのクラスに任せる
window.addEventListener('DOMContentLoaded', () => {
  // ===== 型アサーション as (65_as_assertion.ts) =====
  // getElementById の戻り値は HTMLElement | null
  // HTML を見れば ul 要素だと分かるので、HTMLUListElement として扱う
  // | null を残しているのは「見つからない可能性」をあえて残して次の null チェックにつなげるため
  const goodFoodElement = document.getElementById('good-foods') as HTMLUListElement | null
  const badFoodElement = document.getElementById('bad-foods') as HTMLUListElement | null

  // ===== null チェック（早期リターン） =====
  // ローカル変数に入れているので、if で絞り込んだあとは HTMLUListElement として確定する
  // （class のプロパティ this.xxx だと絞り込めない問題を回避している）
  if (!goodFoodElement || !badFoodElement) return

  // ===== 依存性の注入（DI）の組み立て =====
  // 各クラスに「必要なものを渡す」ことで依存関係を外側で管理する
  // FoodRepository はデータを持ち、FoodRenderer はそれを受け取って描画する
  const repository = new FoodRepository(foodItems)
  const renderer = new FoodRenderer(repository, goodFoodElement, badFoodElement)
  renderer.render()
})
