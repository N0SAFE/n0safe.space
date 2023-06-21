<template>
    <input
        v-bind="$props"
        v-if="$props.type === 'checkbox'"
        id="remember"
        aria-describedby="remember"
        type="checkbox"
        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
        required
    />
    <input
        v-bind="$props"
        v-else-if="$props.type === 'password'"
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        class="
            bg-gray-50
            border border-gray-300
            text-gray-900
            sm:text-sm
            rounded-lg
            focus:ring-primary-600
            focus:border-primary-600
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
        "
        required
    />
    <input
        v-bind="$props"
        v-else-if="$props.type === 'email'"
        type="email"
        name="email"
        id="email"
        class="
            bg-gray-50
            border border-gray-300
            text-gray-900
            sm:text-sm
            rounded-lg
            focus:ring-primary-600
            focus:border-primary-600
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
        "
        placeholder="name@company.com"
        required
    />
    <input
        v-bind="$props"
        v-else
        type="text"
        name="name"
        id="name"
        class="
            bg-gray-50
            border border-gray-300
            text-gray-900
            sm:text-sm
            rounded-lg
            focus:ring-primary-600
            focus:border-primary-600
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
        "
        placeholder="John Doe"
        required
    />
</template>

<script setup>
    // emit all the event to the parent one
    const emit = (event) => (payload) => emit(event, payload);
</script>
