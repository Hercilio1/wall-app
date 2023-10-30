import { User } from '@/models/User'
import Api from '.'

export function getProfile(accessToken: string | null): Promise<User> {
  return Api.getInstance()
    .get_auth(accessToken, `${process.env.NEXT_PUBLIC_URL_API}/api/v1/profile/`)
    .then((response) => (response?.data || {}) as User)
}
