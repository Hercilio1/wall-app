import { Entry } from '@/models/Entry'
import Api from '.'

export function getEntries(page: number = 1): Promise<Entry[]> {
  return Api.get(
    `${process.env.NEXT_PUBLIC_URL_API}/api/v1/entries/?format=json`,
    {
      params: { page }, // TODO: Corrigir lógica de paginação
    }
  ).then((response) => (response?.data?.results || []) as Entry[])
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
