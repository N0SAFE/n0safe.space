<template>
  <div
    :class="isDark && 'dark'"
    class="
      bg-gray-50
      dark:bg-gray-900
      transition-colors
      duration-300
      ease-in-out
      min-h-screen
      flex flex-col
      text-gray-900
      dark:text-white
    "
  >
    <div class="flex-grow w-full flex flex-col">
      <OrganismsNavbar @toggle-sidebar="() => sidebarRef.toggle()" />
      <div class="flex-grow h-full relative">
        <div class="absolute w-full h-full">
          <OrganismsSidebar ref="sidebarRef" />
        </div>

        <div
          class="
            absolute
            h-full
            w-full
            bg-gray-50
            dark:bg-gray-900
            text-gray-900
            dark:text-white
            transition-colors
            duration-300
            ease-in-out
          "
        >
          <div
            class="
              h-full
              w-full
              bg-gray-50
              dark:bg-gray-900
              text-gray-900
              dark:text-white
              transition-colors
              duration-300
              ease-in-out
            "
          >
            <slot />
          </div>
        </div>
      </div>
    </div>
    <!-- <OrganismsFooter /> -->
    <button
      @click="toggleDark"
      class="
        fixed
        bottom-0
        right-0
        p-4
        m-4
        rounded-full
        bg-gray-50
        dark:bg-gray-900
      "
    >
      <svg
        v-if="isDark"
        class="w-6 h-6 text-gray-900 dark:text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM12 22.5C6.201 22.5 1.5 17.799 1.5 12C1.5 6.201 6.201 1.5 12 1.5C17.799 1.5 22.5 6.201 22.5 12C22.5 17.799 17.799 22.5 12 22.5Z"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 4.5C7.857 4.5 4.5 7.857 4.5 12C4.5 16.143 7.857 19.5 12 19.5C16.143 19.5 19.5 16.143 19.5 12C19.5 7.857 16.143 4.5 12 4.5ZM12 17.25C8.41 17.25 5.25 14.09 5.25 10.5C5.25 6.91 8.41 3.75 12 3.75C15.59 3.75 18.75 6.91 18.75 10.5C18.75 14.09 15.59 17.25 12 17.25Z"
        />
      </svg>
      <svg
        v-else
        class="w-6 h-6 text-gray-900 dark:text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM12 22.5C6.201 22.5 1.5 17.799 1.5 12C1.5 6.201 6.201 1.5 12 1.5C17.799 1.5 22.5 6.201 22.5 12C22.5 17.799 17.799 22.5 12 22.5Z"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 4.5C7.857 4.5 4.5 7.857 4.5 12C4.5 16.143 7.857 19.5 12 19.5C16.143 19.5 19.5 16.143 19.5 12C19.5 7.857 16.143 4.5 12 4.5ZM12 17.25C8.41 17.25 5.25 14.09 5.25 10.5C5.25 6.91 8.41 3.75 12 3.75C15.59 3.75 18.75 6.91 18.75 10.5C18.75 14.09 15.59 17.25 12 17.25Z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { useColorMode } from '@vueuse/core'
const mode = useColorMode()
const isDark = computed(() => {
  return mode.value === 'dark'
})

console.log(isDark.value)

const toggleDark = () => {
  mode.value = isDark.value ? 'light' : 'dark'
}

const sidebarRef = ref(null)
onMounted(() => {
  console.log('close')
  // sidebarRef.value.close()
  // sidebarRef.close()
  console.log(sidebarRef.value)
  console.log(sidebarRef)
})
</script>
