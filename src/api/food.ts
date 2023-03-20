import http from './http'
import { FoodClasses } from './types/food'

// 创建食物类别
export const createFoodClasses = (data: FoodClasses) => http.post({ url: '/food-classes', data })
// 删除食物类别
export const deleteFoodClasses = (id: number) => http.delete({ url: `/food-classes/${id}` })
// 修改食物类别
export const alterFoodClasses = (id: number, data: FoodClasses) => http.patch({ url: `/food-classes/${id}`, data })
// 查看食物类别
export const queryFoodClasses = (id: number) => http.get({ url: `/food-classes/${id}` })
