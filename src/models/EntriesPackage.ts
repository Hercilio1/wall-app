import { Entry } from './Entry'

export interface EntriesPackage {
  results: Entry[]
  next: string | null
  previous: string | null
  count: number
}
