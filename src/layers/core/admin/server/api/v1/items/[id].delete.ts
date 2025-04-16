import type { Item } from '@demo/data/types/items.d'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(
    event,
    z.object({
      id: z.string().nonempty().max(255),
    }).safeParse)

  if (params.error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid URL parameters',
      data: params.error,
    })
  }

  const items: Item[] = JSON.parse(await useKV().get('items') ?? '[]')
  const index = items.findIndex((item) => {
    return item.id === params.data.id
  })

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Item not found',
      data: { id: params.data.id },
    })
  }

  items.splice(index, 1)

  await useKV().put('items', JSON.stringify(items))

  setResponseStatus(event, 200, `Item ${params.data.id} deleted`)
})
