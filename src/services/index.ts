import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'

const instance = axios.create({
  baseURL: process.env.URL_API,
  withCredentials: true,
})

class Api {
  private static _instance: Api

  public static getInstance() {
    return this._instance || (this._instance = new this())
  }

  public get_auth(
    token: string | null,
    endpoint: string,
    params: AxiosRequestConfig = {}
  ) {
    return instance.get(endpoint, {
      params: { ...params },
      headers: token ? { Authorization: 'Bearer ' + token } : {},
    })
  }

  public delete_auth(
    token: string,
    endpoint: string,
    params: AxiosRequestConfig
  ) {
    return instance.delete(endpoint, {
      params: { ...params },
      headers: token ? { Authorization: 'Bearer ' + token } : {},
    })
  }

  public post_auth(
    token: string,
    endpoint: string,
    body: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    extraHeaders: RawAxiosRequestHeaders = {}
  ) {
    const headers: RawAxiosRequestHeaders = {
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      ...extraHeaders,
    }
    return instance.post(endpoint, body, { headers })
  }

  public get(endpoint: string, params: AxiosRequestConfig) {
    return instance.get(endpoint, { params })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public post(endpoint: string, body: any) {
    return instance.post(endpoint, body)
  }
}

export default Api
