import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { LzsRequestConfig, LzsRequestInterceptors } from './type'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import { ElLoading } from 'element-plus/es'

class LzsRequest {
  instance: AxiosInstance
  interceptors?: LzsRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: LzsRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true

    //单个实例所特有的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCathch
    )

    //所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        this.loading?.close()
        const data = config.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有的实例都有的拦截器: 响应失败拦截')
        // 将loading移除
        this.loading?.close()
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  }
  //每个单独的请求也可能带有拦截器
  request<T>(config: LzsRequestConfig<T>): Promise<T> {
    return new Promise((resovle, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = true
          resovle(res)
        })
        .catch((err) => {
          this.showLoading = true
          reject(err)
        })
    })
  }

  get<T>(config: LzsRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'Get'
    })
  }

  post<T>(config: LzsRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'POST'
    })
  }

  delete<T>(config: LzsRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'DELETE'
    })
  }

  patch<T>(config: LzsRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'PATCH'
    })
  }
}
export default LzsRequest
