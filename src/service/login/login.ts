import lzsRequest from '..'
import { IAccount, IDataType, ILoginResult } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}

export function accountLoginRequest(Account: IAccount) {
  return lzsRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: Account
  })
}
export function requestUserInfoById(id: number) {
  return lzsRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return lzsRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
