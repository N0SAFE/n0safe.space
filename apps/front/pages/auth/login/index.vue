<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Flowbite
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
                <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="onSubmit({ email, password, test })">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input
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
                            required=""
                            v-model="email"
                        />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
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
                            required=""
                            v-model="password"
                        />
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <AtomsInput type="checkbox" @click="console.log" />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <AtomsButton label="Sign in" />
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <NuxtLink to="/auth/Register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NuxtLink>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import useToastify from "@/composable/useToastify";

    const toast = useToastify();
    const { login } = useDirectusAuth();
    const router = useRouter(); 

    const email = ref("");
    const password = ref("");
    const test = ref("");

    const onSubmit = async ({ email, password }) => {
        try {
            const promise = login({ email, password });
            toast.promise(promise, {
                pending: "Logging in...",
                success: "Login success",
                error: "Login failed"
            });
            await promise;
            router.push("/");
        } catch (e) {
            console.log(e);
        }
    };
</script>
