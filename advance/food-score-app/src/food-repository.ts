// import type: 型情報だけをインポートする構文
// 実行時には消えるため、バンドルサイズに影響しない
import type { FoodItem } from './food-item.js'

// 責務: 食品データの保持とフィルタリング（データアクセス層）
// DOM や画面表示のことは一切知らない（単一責任の原則）
export class FoodRepository {
  // ===== private + readonly (41_private_private_readonly.ts) =====
  // private: 外から直接 items にアクセスさせない（カプセル化）
  // readonly: コンストラクタで受け取った後、配列を差し替えさせない
  private readonly items: readonly FoodItem[]

  // ===== 依存性の注入（DI） =====
  // データを自分で作らず、外から受け取る設計にしている
  // → FoodRepository はどんなデータが来ても動ける（テストしやすい・再利用しやすい）
  constructor(items: readonly FoodItem[]) {
    this.items = items
  }

  // ===== getter (43_getter_setter.ts) =====
  // get をつけると、呼び出し側は repository.goodFoods と「プロパティ」として書ける
  // メソッドのように () をつけなくてよいため、自然な読み方ができる
  get goodFoods(): FoodItem[] {
    return this.items.filter((item) => item.type === 'Good')
  }

  get badFoods(): FoodItem[] {
    return this.items.filter((item) => item.type === 'Bad')
  }
}
