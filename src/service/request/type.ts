import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LzsRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCathch?: (error: any) => any
}

export interface LzsRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: LzsRequestInterceptors<T>
  showLoading?: boolean
}
