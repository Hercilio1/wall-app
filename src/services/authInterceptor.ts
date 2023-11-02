import { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { renewAccessToken } from '@/store/actions/authActions'
import { AppDispatch } from '@/store/store'
import Api from '.'
import { logout } from '@/store/reducers/authReducer'

const authInterceptor = (store: ToolkitStore) => {
  Api.getInstance().interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config.headers['Authorization'] !== 'AuthBearer') {
        return config
      }

      const token = store.getState().auth.accessToken
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const dispatch = store.dispatch as AppDispatch
  Api.getInstance().interceptors.response.use(
    (res: AxiosResponse) => {
      return res
    },
    async (err) => {
      const originalConfig = err.config
      const isAuthBearer =
        typeof originalConfig.headers.Authorization === 'string' &&
        originalConfig.headers.Authorization.includes('Bearer ')

      if (isAuthBearer && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true

          try {
            const token = store.getState().auth.refreshToken
            if (token) {
              const res = await dispatch(renewAccessToken(token)).unwrap()
              const { access_token } = res
              if (access_token) {
                originalConfig.headers[
                  'Authorization'
                ] = `Bearer ${access_token}`
              }
            }
            return Api.getInstance()(originalConfig)
          } catch (_error) {
            dispatch(logout())
            return Promise.reject(_error)
          }
        }
      }

      return Promise.reject(err)
    }
  )
}

export default authInterceptor
