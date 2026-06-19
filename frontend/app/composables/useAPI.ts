export const useAPI = createUseFetch(() => {
  const config = useRuntimeConfig();
  
  return {
    baseURL: config.public.apiBase || "http://localhost:4000/api",
    lazy: true,
  }
})