export const API = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
    ENDPOINTS: {
        AUTH: {
            SIGNUP: "/auth/signup",
            LOGIN: "/auth/login",
            LOGOUT: "/auth/logout",
            REFRESH_TOKEN: "/auth/refresh-token",
            FORGOT_PASSWORD: "/auth/forgot-password",
            RESET_PASSWORD: "/auth/reset-password",
        },
        USER: {
            PROFILE: "/user/profile",
            UPDATE_PROFILE: "/user/profile",
            CHANGE_PASSWORD: "/user/change-password",
        },
    },
};
