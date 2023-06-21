<template>
    <div style="background-color: black; line-height: 18px; color: white; height: 100vh; overflow-y: auto; font-weight: 100; font-family: 'Cascadia Code', sans-serif; font-size: smaller" ref="divRef">
        <ul>
            <li v-for="(log, index) in display" :key="index">
                <span v-if="log.length === 0">n</span>
                <span v-else v-for="(line, index) in log" :class="line.eventName" :key="index" v-html="line.data"></span>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { io } from "socket.io-client";
    import Convert from "ansi-to-html";
    const convert = new Convert();
    // import aha from 'aha'

    class Test {
        line = [];
        currentLine = 0;
        constructor() {}

        nextLine() {
            this.currentLine = this.currentLine + 1;
        }

        write(data) {
            this.line[this.currentLine] = Array.isArray(this.line[this.currentLine]) ? [...this.line[this.currentLine], data] : [data];
        }

        handle() {
            return Object.values(this.line)
                .map(function (s) {
                    const i = s.findIndex(function (i) {
                        return !i.data;
                    });
                    if (i === -1) {
                        return s;
                    }
                    s.splice(i, 1);
                    return s;
                })
                .filter(function (a) {
                    return a.length;
                })
                .map(function (l) {
                    return l.map(function (s) {
                        if (s.data === "") {
                            return {
                                data: "n",
                                eventName: "break"
                            };
                        }
                        return s;
                    });
                })
                .map(function (l) {
                    return l.map((s) => ({ ...s, data: convert.toHtml(s.data) }));
                });
        }
    }
    
    const divRef = ref()

    const error = ref("");
    const logs = ref([]);

    const display = computed(() => {
        const test = new Test();
        logs.value.forEach((log) => {
            if (typeof log.data === "string") {
                log.data.split("\n").forEach(function (n, index) {
                    test.write({
                        data: n,
                        eventName: log.eventName
                    });
                    if (index === log.data.split("\n").length - 1) {
                        return;
                    }
                    test.nextLine();
                });
            } else {
                test.nextLine();
                test.write(log);
            }
        });
        let ret = test.handle();
        console.clear();
        console.log(ret)
        if(divRef?.value?.scrollHeight - divRef?.value?.clientHeight < divRef?.value?.scrollTop + 100){
            setTimeout(() => {
                divRef?.value?.scrollTo(0, divRef?.value?.scrollHeight)
            }, 1)
        }
        return ret;
    });

    // "undefined" means the URL will be computed from the `window.location` object
    onMounted(() => {
        try {
            console.log("connection");
            const URL = "http://n0safe.space:1338";

            const socket = io(URL, { transports: ["websocket", "polling", "flashsocket"] });

            const state = reactive({
                connected: false
            });

            socket.emit("subscribe", {
                type: "reader",
                id: "directus"
            });

            socket.on("connect", () => {
                console.log("connected");
                state.connected = true;
            });

            socket.on("disconnect", () => {
                console.log("disconnected");
                state.connected = false;
            });

            socket.on("data", (arg) => {
                if (typeof arg !== "string") {
                    logs.value = [...logs.value, { data: arg, eventName: "data" }, { data: "\n", eventName: "data" }];
                } else {
                    logs.value = [...logs.value, { data: arg, eventName: "data" }];
                }
                console.log(logs.value);
            });

            socket.on("status", (arg) => {
                if (!arg.status) {
                    return;
                }
                logs.value = [...logs.value, { data: arg.status + "\n", eventName: "status" }];
            });

            onUnmounted(() => {
                socket.close();
            });
        } catch (e) {
            error.value = e;
        }
    });
</script>

<style>
    .status {
        color: blue;
    }

    .break {
        visibility: hidden;
    }
</style>
