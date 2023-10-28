import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'

const instance = axios.create({
  baseURL: process.env.URL_API,
  withCredentials: true,
})

interface Store {
  token: string | null
}

const api = {
  store: null as Store | null,

  get_auth(endpoint: string, params: AxiosRequestConfig = {}) {
    const token = this.store ? this.store.token : null
    return instance.get(endpoint, {
      params: { ...params },
      headers: token ? { Authorization: 'Bearer ' + token } : {},
    })
  },

  delete_auth(endpoint: string, params: AxiosRequestConfig) {
    const token = this.store ? this.store.token : null
    return instance.delete(endpoint, {
      params: { ...params },
      headers: token ? { Authorization: 'Bearer ' + token } : {},
    })
  },

  post_auth(
    endpoint: string,
    body: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    extraHeaders: RawAxiosRequestHeaders = {}
  ) {
    const token = this.store ? this.store.token : null
    const headers: RawAxiosRequestHeaders = {
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      ...extraHeaders,
    }
    return instance.post(endpoint, body, { headers })
  },

  get(endpoint: string, params: AxiosRequestConfig) {
    return instance.get(endpoint, { params })
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post(endpoint: string, body: any) {
    return instance.post(endpoint, body)
  },
}

function setInstance(state: Store | null) {
  api.store = state
}

export { api, setInstance }
