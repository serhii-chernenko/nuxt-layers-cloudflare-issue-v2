export default defineEventHandler(async (event) => {
  const items = JSON.parse(await useKV().get('items') ?? '[]')

  if (!items?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'The items list is already empty',
    })
  }

  await useKV().put('items', '[]')

  setResponseStatus(event, 200, 'All items deleted')
})
