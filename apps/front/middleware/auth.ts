export default defineNuxtRouteMiddleware((to, from) => {
    const user = useDirectusUser()
    console.log(user)
    console.log(!user.value)
    if(!user.value){
        return navigateTo("/auth/login")
    }
});
