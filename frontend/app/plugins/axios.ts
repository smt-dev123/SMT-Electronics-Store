import axios from "axios";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    const api = axios.create({
        baseURL: config.public.apiBase || 'http://localhost:8000',
    });

    if (config.apiSecret) {
        api.defaults.headers.common.Authorization = `Bearer ${config.apiSecret}`;
    }

    return {
        provide: {
            api,
        },
    };
});