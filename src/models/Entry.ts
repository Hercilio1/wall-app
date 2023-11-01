import { User } from './User'

export interface Entry {
  id: number
  content: string
  created_at: string
  user: User
}
