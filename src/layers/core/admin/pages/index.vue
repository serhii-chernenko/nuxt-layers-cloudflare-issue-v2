<template>
  <div class="grid place-items-center h-svh">
    <div class="grid w-64 gap-8">
      <h1 class="text-4xl font-bold text-center">
        Items list
      </h1>
      <div
        v-if="error"
        role="alert"
        class="alert alert-error"
      >
        <span>{{ error?.statusMessage ?? 'Something went wrong...' }}</span>
      </div>
      <template v-else>
        <div
          v-if="!items?.length"
          role="alert"
          class="alert"
        >
          <span>The list is empty</span>
        </div>
        <ul
          v-else
          class="grid gap-2"
        >
          <li
            v-for="item in items"
            :key="item.id"
            class="flex items-center justify-between gap-4"
          >
            <span>{{ item.name }}</span>
            <button
              type="button"
              title="Delete item"
              class="btn btn-xs btn-error btn-outline"
              :disabled="isLoading"
              @click="deleteItem({ id: item.id })"
            >
              Delete
            </button>
          </li>
        </ul>
        <button
          v-if="reachedLimit"
          type="button"
          title="Delete all items"
          class="btn btn-error btn-wide"
          :disabled="isLoading"
          @click="deleteItems"
        >
          <span
            v-if="isLoading"
            class="loading loading-infinity"
          />
          <span v-if="isLoading">Updating...</span>
          <span v-else>Delete all items</span>
        </button>
        <button
          v-else
          type="button"
          title="Add new item"
          class="btn btn-primary btn-wide"
          :disabled="isLoading"
          @click="addItem"
        >
          <span
            v-if="isLoading"
            class="loading loading-infinity"
          />
          <span v-if="isLoading">Updating...</span>
          <span v-else>Add new item</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '@demo/data/types/items.d'

const config = useRuntimeConfig().public

const { data: items, status, error, refresh } = await useFetch<Item[]>('/api/v1/items')

const isLoading = shallowRef<boolean>(false)
const reachedLimit = computed<boolean>(() => {
  return (items?.value?.length ?? 0) >= (config?.itemsLimit as number || 5)
})

watchEffect(() => {
  isLoading.value = status.value === 'pending'
})

const addItem = async () => {
  isLoading.value = true

  try {
    await $fetch('/api/v1/items', {
      method: 'put',
    })
    await refresh()
  } catch (exception: any) {
    throw createError(exception)
  } finally {
    isLoading.value = false
  }
}

const deleteItem = async (item: Pick<Item, 'id'>) => {
  isLoading.value = true

  try {
    await $fetch(`/api/v1/items/${item.id}`, {
      method: 'delete',
    })
    await refresh()
  } catch (exception: any) {
    throw createError(exception)
  } finally {
    isLoading.value = false
  }
}

const deleteItems = async () => {
  isLoading.value = true

  try {
    await $fetch('/api/v1/items', {
      method: 'delete',
    })
    await refresh()
  } catch (exception: any) {
    throw createError(exception)
  } finally {
    isLoading.value = false
  }
}
</script>
