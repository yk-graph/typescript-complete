// ===== literal型 + union型 (23_literal.ts / 22_union.ts) =====
// 'Good' | 'Bad' という2つのリテラル型をユニオンで組み合わせている
// string にすると何でも入ってしまうが、これにより 'Good' か 'Bad' しか入らないことが保証される
export type FoodType = 'Good' | 'Bad'

// ===== interface (50_interface_implements.ts) =====
// FoodItem の「形（データの型）」だけを定義する
// class ではないので処理は持たない。純粋なデータ構造の定義
export interface FoodItem {
  id: number
  name: string
  score: number
  type: FoodType // FoodType 以外の文字列は代入できない
}

// ===== readonly (41_private_private_readonly.ts) =====
// readonly FoodItem[] にすることで、この配列自体を書き換えられないようにしている
// as const を使わず明示的な型注釈で readonly を表現するパターン
// → push / splice など配列を変更するメソッドが使えなくなる
export const foodItems: readonly FoodItem[] = [
  { id: 1, name: 'Lettuce', score: 3, type: 'Good' },
  { id: 2, name: 'Tomato', score: 4, type: 'Good' },
  { id: 3, name: 'Cheese', score: 2, type: 'Bad' },
  { id: 4, name: 'Bread', score: 5, type: 'Good' },
  { id: 5, name: 'Butter', score: 1, type: 'Bad' },
  { id: 6, name: 'Egg', score: 4, type: 'Good' },
  { id: 7, name: 'Bacon', score: 2, type: 'Bad' },
  { id: 8, name: 'Avocado', score: 5, type: 'Good' },
  { id: 9, name: 'Onion', score: 3, type: 'Good' },
  { id: 10, name: 'Garlic', score: 4, type: 'Good' },
  { id: 11, name: 'Mushroom', score: 3, type: 'Good' },
  { id: 12, name: 'Pepper', score: 2, type: 'Bad' },
  { id: 13, name: 'Carrot', score: 4, type: 'Good' },
  { id: 14, name: 'Cucumber', score: 3, type: 'Good' },
  { id: 15, name: 'Spinach', score: 5, type: 'Good' },
  { id: 16, name: 'Potato', score: 2, type: 'Bad' },
  { id: 17, name: 'Sweet Potato', score: 4, type: 'Good' },
  { id: 18, name: 'Zucchini', score: 3, type: 'Good' },
  { id: 19, name: 'Eggplant', score: 2, type: 'Bad' },
  { id: 20, name: 'Corn', score: 4, type: 'Good' },
]
