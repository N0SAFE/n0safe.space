import { defineStore } from 'pinia'
import useApiFetch from '@/composables/useApiFetch'

export const userStore = defineStore('user', () => {
  const apiFetch = useApiFetch()
  const state = reactive({
    user: null,
    isFetching: false,
    isInitialized: false,
    jwt: null,
  })

  watch(state.user, () => {
    console.log('userStore', state)
  })

  const actions = {
    async init() {
      console.log('userStore init')
      state.isFetching = true
      const data = await apiFetch('whoami')
      const { isLoggedIn, user, jwt } = await data.json()
      if (isLoggedIn) {
        state.user = user
      } else {
        state.user = null
      }
      state.jwt = jwt || null
      state.isFetching = false
      state.isInitialized = true
    },

    async refresh() {
      state.isFetching = true
      const data = await apiFetch('whoami')
      const { isLoggedIn, user, payload } = await data.json()
      if (isLoggedIn) {
        state.user = user
      } else {
        state.user = null
      }
      state.isFetching = false
    },
  }

  return {
    state,
    actions,
  }
})

// Path: apps\front\store\index.js
