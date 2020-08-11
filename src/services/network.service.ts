import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class NetworkService {
  private api: AxiosInstance

  static CancelToken = axios.CancelToken
  static source = NetworkService.CancelToken.source()

  constructor (baseURL: string) {
    this.api = axios.create({
      baseURL: baseURL,
      timeout: 30000
    })
  }

  private async requestHandler (callback: () => Promise<any>) {
    const { data, status } = await callback()

    switch (status) {
      case 200:
      case 201:
        return data
      default:
        return null
    }
  }

  public async get (
    url: string,
    options?: AxiosRequestConfig
  ): Promise<any> {
    const request = () => this.api.get(url, { ...options, cancelToken: NetworkService.source.token })
    const result = await this.requestHandler(request)
    return result
  }

  public async post (
    url: string,
    options?: AxiosRequestConfig
  ): Promise<any> {
    const request = () => this.api.post(url, options?.data, { ...options, cancelToken: NetworkService.source.token })
    const result = await this.requestHandler(request)
    return result
  }

  public async update (
    url: string,
    options?: AxiosRequestConfig
  ): Promise<any> {
    const request = () => this.api.patch(url, options?.data, { ...options, cancelToken: NetworkService.source.token })
    const result = await this.requestHandler(request)
    return result
  }

  public async delete (
    url: string
  ): Promise<any> {
    const request = () => this.api.delete(url, { cancelToken: NetworkService.source.token })
    const result = await this.requestHandler(request)
    return result
  }
}

export default NetworkService
