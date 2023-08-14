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
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import Convert from 'ansi-to-html'
import useSocketLogger from '@/composables/useSocketLogger'
const convert = new Convert({
  newline: true,
  escapeXML: true,
  stream: true,
})

const createReaderClient = useSocketLogger()
const client = createReaderClient({
  host: 'localhost',
  port: 65000,
  space: 'cli-main',
})

onUnmounted(() => {
  client.disconnect()
})

const divRef = ref()

const error = ref('')
const logs = ref([])

const _display = computed(() => {
  const d = convert.toHtml(logs.value.map((d) => d.data).join(''))
  // find first <br> and remove all before
  const numOfI = d.split('<br/>').length - 1
  const i = d.indexOf('<br/>')
  if (i === -1 || numOfI === 1) {
    return d
  }
  const ret = d.substring(i + 5)
  return ret
})

client.listenOnServerConnection('data', (data) => {
  console.log('data')
  console.log(data)
  logs.value = [...logs.value, { data: data, eventName: 'data' }]
})
client.listenOnServerConnection('error', function (err) {
  logs.value = [...logs.value, { data: err, eventName: 'error' }]
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
