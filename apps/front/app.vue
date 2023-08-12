<template>
  <MoleculesLoader :isLoading="isLoading">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </MoleculesLoader>
</template>

<script setup>
import { userStore } from '@/store/user.store'

const store = userStore()
const isLoading = computed(() => !store.state.isInitialized)
</script>
