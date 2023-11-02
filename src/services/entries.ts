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
  ).then((response) => {
    if (response?.data) {
      return response.data as Entry
    }
    throw new Error('Error while posting new entry')
  })
}
