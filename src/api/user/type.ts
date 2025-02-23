// 登录接口需要携带的参数ts类型
export interface LoginForm {
  username: string
  password: string
}

// 定义接口返回的公共数据ts类型
export interface PubResponseData {
  code: number
  message: string
  ok: boolean
}

// 登录接口返回数据ts类型
export interface LoginResponseData extends PubResponseData {
  data: string
}

// 用户信息返回数据ts类型
interface UserInfoType {
  avatar: string
  name: string
  roles: string[]
  buttons: string[]
  routes: string[]
}

export interface UserInfoResponseData extends PubResponseData {
  data: UserInfoType
}

// 退出登录返回数据ts类型
export interface LogoutReponseData extends PubResponseData {
  data: string | null
}
