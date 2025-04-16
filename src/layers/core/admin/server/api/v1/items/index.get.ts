import type { Item } from '@demo/data/types/items.d'

export default defineEventHandler(async (): Promise<Item[]> => {
  return JSON.parse(await useKV().get('items') ?? '[]')
})
