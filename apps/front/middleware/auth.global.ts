import { userStore } from '@/store/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = userStore()

  // check if the render is server side
  if (process.server) {
    // check if the user is authenticated
    return
  }
  await store.actions.init()
})
