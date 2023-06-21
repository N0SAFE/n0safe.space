<template>
    <MoleculesTerminal :lines="lines" />
</template>

<script setup>
    const lines = ref([]);
    const socketUrl = "ws://n0safe.space";
    const socketPort = 1338;
    const socketPath = "";
    onMounted(() => {
        const websocket = new WebSocket(`${socketUrl}:${socketPort}${socketPath}`);
        const connect = () => {
            websocket.onopen = () => {
                console.log("Connected to websocket");
            };
            websocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                lines.value.push(data.message);
            };
            websocket.onclose = () => {
                console.log("Disconnected from websocket");
                setTimeout(() => {
                    connect();
                }, 5000);
            };
        };
    });
</script>
