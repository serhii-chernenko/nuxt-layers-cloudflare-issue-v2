import type { Item } from '@demo/data/types/items.d'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event).public
  const items: Item[] = JSON.parse(await useKV().get('items') ?? '[]')

  if (items.length >= (config?.itemsLimit as number || 5)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Maximum items reached',
    })
  }

  const id = crypto.randomUUID()
  const item = {
    id,
    name: `Item ${items.length + 1}`,
  }

  items.push(item)

  await useKV().put('items', JSON.stringify(items))

  return item
})
