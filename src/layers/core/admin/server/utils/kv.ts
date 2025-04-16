export function useKV() {
  const { KV } = (globalThis as any).__env__

  if (!KV) {
    throw createError(`KV storage not found in ENV`)
  }

  return KV
}
