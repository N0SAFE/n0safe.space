<template>
    <div class="terminal-window">
        <div class="terminal-body">
            <div v-for="(line, index) in lines" :key="index" class="terminal-line">{{ line }}</div>
        </div>
    </div>
</template>

<script setup> 
    const props = defineProps({
        lines: {
            type: Array,
            default: () => []
        }
    });
    definePageMeta({
        middleware: "auth"
    });
</script>

<style scoped>
    .terminal-window {
        background-color: #1e1e1e;
        color: #fff;
        font-family: monospace;
        font-size: 14px;
        height: 100%;
        overflow-y: scroll;
        position: relative;
    }
    .green {
        background-color: #27c93f;
    }

    .terminal-body {
        margin-top: 30px;
    }

    .terminal-line {
        padding: 2px;
    }
</style>