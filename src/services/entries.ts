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
