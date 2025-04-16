<template>
  <div class="grid place-items-center h-svh">
    <div class="grid w-64 gap-8">
      <h1 class="text-4xl font-bold text-center">
        Items list
      </h1>
      <ul class="grid gap-2">
        <li
          v-for="(item, index) in ['Item 1', 'Item 2', 'Item 3']"
          :key="index"
          class="flex items-center justify-between gap-4"
        >
          <span>{{ item }}</span>
          <button
            type="button"
            title="Delete item"
            class="btn btn-xs btn-error btn-outline"
          >
            Delete
          </button>
        </li>
      </ul>
      <button
        type="button"
        title="Add new item"
        class="btn btn-primary btn-wide"
      >
        Add new item
      </button>
    </div>
  </div>
</template>
