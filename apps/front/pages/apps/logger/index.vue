<template>
  <div
    style="
      background-color: black;
      line-height: 18px;
      color: white;
      height: 100%;
      font-weight: 100;
      font-family: sans-serif;
      font-size: smaller;
      overflow: auto;
    "
    ref="divRef"
  >
    <div v-html="_display"></div>
  </div>

  <!-- Terminal menu -->
  <div class="absolute top-0 right-0 p-2 transition-all">
    <button
      type="button"
      class="
        w-full
        flex
        items-center
        bg-gray-700
        hover:bg-gray-600
        px-3
        py-2
        focus:outline-none
      "
      :class="isMenuActive ? 'rounded-t-2xl' : 'rounded-2xl'"
      @click="toggleMenu"
    >
      <span class="text-green-400 mr-2">Opened Terminals</span>
    </button>

    <!-- Terminal menu items -->
    <div v-if="isMenuActive" class="bg-gray-700 rounded-b-2xl overflow-hidden">
      <div
        class="
          p-2
          hover:bg-gray-600
          cursor-pointer
          flex
          items-center
          justify-between
        "
      >
        <input
          v-on:keyup.enter="
            () => {
              const terminalsLength = terminals.size
              const newTerminal = { name: terminalInput.value }
              addTerminal(newTerminal)
              if (!terminalsLength) {
                switchTerminal(newTerminal)
              }
              terminalInput.value = ''
            }
          "
          ref="terminalInput"
          class="
            bg-gray-600
            text-gray-400
            focus:outline-none
            focus:ring-2 focus:ring-green-400
            rounded
            px-2
            py-1
          "
          placeholder="New terminal name"
        />
      </div>
      <div
        v-for="(terminal, index) in terminals"
        :key="index"
        class="p-2 hover:bg-gray-600 cursor-pointer flex"
        @click="terminal.switch()"
      >
        <div class="w-4 flex items-center">
          <!-- svg check green -->
          <svg
            class="w-3 h-2 text-green-400 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            v-if="terminal.name === currentTerminal?.name"
          >
            <path
              d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
            />
          </svg>
        </div>
        <div class="flex items-center justify-between w-full">
          {{ terminal.name }}
          <svg
            class="w-4 h-4 text-green-400 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            @click="() => removeTerminal(terminal)"
          >
            <path
              d="M14.95 5.37a1 1 0 00-1.41 0L10 8.94l-3.54-3.57a1 1 0 10-1.41 1.42L8.57 10l-3.54 3.54a1 1 0 001.41 1.42L10 11.36l3.54 3.57a1 1 0 001.41-1.42L11.43 10l3.54-3.54a1 1 0 000-1.09z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import Convert from 'ansi-to-html'
import useSocketLogger from '@/composables/useSocketLogger'

const terminalsAlreadyOpen = JSON.parse(
  localStorage.getItem('terminalsAlreadyOpen')
)

const createReaderClient = useSocketLogger()

const convert = new ref(null)
const terminalInput = ref(null)
const terminals = ref(new Set())
const isMenuActive = ref(false)
const currentTerminal = ref(null)
const divRef = ref()
const logs = ref([])

const _display = computed(() => {
  if (convert.value === null) {
    return ''
  }
  return convert.value.toHtml(logs.value.map((d) => d.data).join(''))
})

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value
  if (isMenuActive.value) {
    nextTick(() => {
      terminalInput.value.focus()
    })
  }
}

let lastWatchStopHandle = null

const switchTerminal = (terminal) => {
  if (!terminals.value.has(terminal)) {
    return
  }
  currentTerminal.value = terminal
  logs.value = terminal.logs.value
  if (lastWatchStopHandle !== null) {
    lastWatchStopHandle()
  }
  lastWatchStopHandle = watch(terminal.logs, () => {
    logs.value = terminal.logs.value
  })
  convert.value = new Convert({
    newline: true,
    escapeXML: true,
  })
  localStorage.setItem('lastTerminal', terminal.name)
}

const addTerminal = (terminal) => {
  const exist = [...terminals.value].find((t) => t.name === terminal.name)
  if (exist) {
    exist.switch()
    return
  }
  const client = createReaderClient({
    host: 'localhost',
    port: 65000,
    space: terminal.name,
  })

  terminal.client = client
  terminal.logs = ref([])
  terminal.switch = () => switchTerminal(terminal)
  terminals.value.add(terminal)

  onUnmounted(() => {
    client.disconnect()
  })
  client.listenOnServerConnection('data', (data) => {
    terminal.logs.value = [
      ...terminal.logs.value,
      { data: data, eventName: 'data' },
    ]
  })
  client.listenOnServerConnection('error', function (err) {
    terminal.logs.value = [
      ...terminal.logs.value,
      { data: err, eventName: 'error' },
    ]
  })

  localStorage.setItem(
    'terminalsAlreadyOpen',
    JSON.stringify(
      [...terminals.value].map((terminal) => ({ name: terminal.name }))
    )
  )
}

const removeTerminal = (terminal) => {
  terminals.value.delete(terminal)
  terminal.client.disconnect()
  if (currentTerminal.value === terminal) {
    currentTerminal.value = null
    nextTick(() => {
      if (terminals.value.size > 0) {
        switchTerminal([...terminals.value][0])
      }
      logs.value = []
    })
  }

  localStorage.setItem(
    'terminalsAlreadyOpen',
    JSON.stringify(
      [...terminals.value].map((terminal) => ({ name: terminal.name }))
    )
  )
}

terminalsAlreadyOpen?.forEach((terminal) => {
  addTerminal({ name: terminal.name })
})
</script>

<style>
.status {
  color: blue;
}

.break {
  visibility: hidden;
}
</style>
