import http from './http'
import { FoodClasses } from './types/food'

// 创建食物类别
export function createFoodClasses(data: FoodClasses) {
  return http.post({ url: '/food-classes', data })
}
// 删除食物类别
export function deleteFoodClasses(id: number) {
  return http.delete({ url: `/food-classes/${id}` })
}
// 修改食物类别
export function alterFoodClasses(id: number, data: FoodClasses) {
  return http.patch({ url: `/food-classes/${id}`, data })
}
// 获取食物类别
export function getFoodClasses(id: number) {
  return http.get<FoodClasses>({ url: `/food-classes/${id}` })
}
// 获取所有食物类别
export function getAllFoodClasses() {
  return http.get<FoodClasses[]>({ url: '/food-classes' })
}
