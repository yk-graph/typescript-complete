import type { FoodItem } from './food-item.js'
import type { FoodRepository } from './food-repository.js'

// 責務: DOM要素の生成と画面への描画（ビュー層）
// データの中身（食品の点数計算など）は一切知らない（単一責任の原則）
export class FoodRenderer {
  // ===== private + readonly (41_private_private_readonly.ts) =====
  // private: このクラスの外から DOM 要素を直接さわれないようにする（カプセル化）
  // readonly: コンストラクタで受け取った後、要素の参照が差し替えられないようにする
  private readonly repository: FoodRepository
  private readonly goodFoodElement: HTMLUListElement
  private readonly badFoodElement: HTMLUListElement

  // ===== 依存性の注入（DI） =====
  // FoodRepository も DOM 要素も、自分で取りに行かず外から受け取る
  // → HTML の id 名が変わっても、このクラスを修正する必要がない
  // → FoodRepository の中身が変わっても、このクラスは render() を呼ぶだけでよい
  constructor(repository: FoodRepository, goodFoodElement: HTMLUListElement, badFoodElement: HTMLUListElement) {
    this.repository = repository
    this.goodFoodElement = goodFoodElement
    this.badFoodElement = badFoodElement
  }

  render(): void {
    // getter（repository.goodFoods）を呼ぶたびに filter が走る点に注意
    this.repository.goodFoods.forEach((food) => {
      this.goodFoodElement.appendChild(this.createListElement(food))
    })
    this.repository.badFoods.forEach((food) => {
      this.badFoodElement.appendChild(this.createListElement(food))
    })
  }

  // ===== private メソッド (41_private_private_readonly.ts) =====
  // createListElement は render() の実装の詳細なので private にしている
  // → 外から呼び出せないようにして、「render() だけ使えばOK」という設計にする
  // 戻り値の型を HTMLLIElement と明示することで、appendChild に渡せる型が保証される
  private createListElement(food: FoodItem): HTMLLIElement {
    const li = document.createElement('li')
    li.classList.add('flex', 'items-center', 'gap-2', 'py-1', 'px-2', 'bg-white', 'rounded-sm', 'shadow-md', 'cursor-pointer', 'hover:bg-gray-100')

    const nameSpan = document.createElement('span')
    nameSpan.classList.add('text-base')
    nameSpan.textContent = food.name

    const scoreSpan = document.createElement('span')
    scoreSpan.classList.add('text-sm', 'font-bold')
    // ===== literal型の絞り込み =====
    // food.type は 'Good' | 'Bad' のどちらかに限定されているため、
    // 三項演算子で安全に '+' / '-' を判定できる
    scoreSpan.textContent = `${food.type === 'Good' ? '+' : '-'}${food.score}`

    li.appendChild(nameSpan)
    li.appendChild(scoreSpan)

    return li
  }
}
