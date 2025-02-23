/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-17 17:26:14
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-17 23:33:54
 * @Description:
 */
// 封装本地存储数据与读取数据方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
