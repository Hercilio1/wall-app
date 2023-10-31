import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'

const instance = axios.create({
  baseURL: process.env.URL_API,
  withCredentials: true,
})

class Api {
  public static getInstance() {
    return instance
  }

  public static get_auth(endpoint: string, params: AxiosRequestConfig = {}) {
    return instance.get(endpoint, {
      params: { ...params },
      headers: { Authorization: 'AuthBearer' },
    })
  }

  public static delete_auth(endpoint: string, params: AxiosRequestConfig) {
    return instance.delete(endpoint, {
      params: { ...params },
      headers: { Authorization: 'AuthBearer' },
    })
  }

  public static post_auth(
    endpoint: string,
    body: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    extraHeaders: RawAxiosRequestHeaders = {}
  ) {
    const headers: RawAxiosRequestHeaders = {
      ...{ Authorization: 'AuthBearer' },
      ...extraHeaders,
    }
    return instance.post(endpoint, body, { headers })
  }

  public static get(endpoint: string, params: AxiosRequestConfig) {
    return instance.get(endpoint, { params })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static post(endpoint: string, body: any) {
    return instance.post(endpoint, body)
  }
}

export default Api
