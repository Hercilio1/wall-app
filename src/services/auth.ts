import Api from '.'
import { Auth } from '@/models/Auth'

export function login(username: string, password: string): Promise<Auth> {
  return Api.post(`${process.env.NEXT_PUBLIC_URL_API}/o/token/`, {
    grant_type: 'password',
    username,
    password,
    client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
  })
    .then((response) => {
      if (response.data?.access_token && response.data?.refresh_token) {
        return {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        } as Auth
      }
      throw new Error('Authentication failed')
    })
    .catch((error) => {
      if (error?.response?.data?.error_description) {
        throw new Error(error.response.data.error_description)
      }
      throw new Error('Authentication failed')
    })
}

export function refreshTokens(refreshToken: string): Promise<Auth> {
  return Api.post(`${process.env.NEXT_PUBLIC_URL_API}/o/token/`, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
  })
    .then((response) => {
      if (response.data?.access_token && response.data?.refresh_token) {
        return {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        } as Auth
      }
      throw new Error('Authentication failed')
    })
    .catch((error) => {
      if (error?.response?.data?.error_description) {
        throw new Error(error.response.data.error_description)
      }
      throw new Error('Authentication failed')
    })
}
