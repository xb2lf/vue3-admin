/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-17 18:23:10
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-19 02:09:36
 * @Description:
 */
// 统一管理用户相关接口
import request from '@/utils/request'
import type {
  LoginForm,
  LoginResponseData,
  UserInfoResponseData,
  LogoutReponseData,
} from './type.ts'

// 统一管理管理接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 暴露请求函数

// 登录接口
export const reqLogin = (data: LoginForm) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)

// 获取用户信息接口
export const reqUserInfo = () =>
  request.get<any, UserInfoResponseData>(API.USERINFO_URL)

// 退出登录接口
export const reqLogout = () =>
  request.post<any, LogoutReponseData>(API.LOGOUT_URL)
