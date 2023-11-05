import { Entry } from '@/models/Entry'
import Api from '.'
import { EntriesPackage } from '@/models/EntriesPackage'

export function getEntries(page: number): Promise<EntriesPackage> {
  if (page < 1) {
    return new Promise((resolve) => {
      resolve({
        results: [],
        next: null,
        previous: null,
        count: 0,
      } as EntriesPackage)
    })
  }
  return Api.get(
    `${process.env.NEXT_PUBLIC_URL_API}/api/v1/entries/?format=json&page=${page}`,
    {}
  ).then((response) => response?.data as EntriesPackage)
}

export function postEntry(content: string): Promise<Entry> {
  return Api.post_auth(
    `${process.env.NEXT_PUBLIC_URL_API}/api/v1/entries/create/`,
    {
      content: content,
    }
  )
    .then((response) => {
      if (response?.data) {
        return response.data as Entry
      }
      throw new Error('Error while posting new entry')
    })
    .catch((error) => {
      if (error?.response?.data?.detail) {
        throw new Error(error.response.data.detail)
      }
      throw new Error('Error while posting new entry')
    })
}

export function updateEntry(id: number, content: string): Promise<Entry> {
  return Api.put_auth(
    `${process.env.NEXT_PUBLIC_URL_API}/api/v1/entries/${id}/`,
    {
      content: content,
    }
  )
    .then((response) => {
      if (response?.data) {
        return response.data as Entry
      }
      throw new Error('Error while posting new entry')
    })
    .catch((error) => {
      if (error?.response?.data?.detail) {
        throw new Error(error.response.data.detail)
      }
      throw new Error('Error while posting new entry')
    })
}

export function deleteEntry(id: number): Promise<void> {
  return Api.delete_auth(
    `${process.env.NEXT_PUBLIC_URL_API}/api/v1/entries/${id}/`
  ).then(() => {})
}
