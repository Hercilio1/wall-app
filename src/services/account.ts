import { User } from '@/models/User'
import Api from '.'

export function getProfile(): Promise<User> {
  return Api.get_auth(
    `${process.env.NEXT_PUBLIC_URL_API}/api/v1/profile/`
  ).then((response) => (response?.data || {}) as User)
}
