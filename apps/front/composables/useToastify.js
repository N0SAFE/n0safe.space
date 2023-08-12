import { updateGlobalOptions } from 'vue3-toastify'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
const isDark = computed(() => {
  return mode.value === 'dark'
})
updateGlobalOptions({
  position: 'bottom-left',
  theme: isDark.value ? 'dark' : 'light',
  autoClose: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.7,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  clearOnUrlChange: false,
})
watch(isDark, () => {
  updateGlobalOptions({
    position: 'bottom-left',
    theme: isDark.value ? 'dark' : 'light',
    autoClose: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.7,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
    clearOnUrlChange: false,
  })
})

export default function () {
  return useNuxtApp().$toast
}
