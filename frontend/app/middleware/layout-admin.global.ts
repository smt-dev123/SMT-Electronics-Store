export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/admin')) {
    to.meta.layout = 'admin' as any
  }
  if (to.path.startsWith('/auth')) {
    to.meta.layout = 'auth' as any
  }
})