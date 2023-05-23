<template>
    <div v-if="isDark" :class="isDark && 'dark'">
        <slot />
    </div>
</template>

<script setup>
    import {useColorMode} from "@vueuse/core"
    const mode = useColorMode()
    const isDark = mode.value === "dark"
</script>