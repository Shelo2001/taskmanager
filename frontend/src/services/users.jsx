import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useUsers = create(
    devtools((set) => ({
        users: [],
        user: {},
        token: null,
        fetch: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/users`
            );
            set({ users: await res.data });
        },
        login: async (data) => {
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/login`,
                data
            );
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            set({ user: await res.data.user, token: await res.data.token });
            window.location.href = "/";
        },
        logout: async (data) => {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/logout`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
        },
        createUser: async (data) => {
            const res = await axios.post(
                "${import.meta.env.VITE_BASE_API_URL}/users",
                data
            );
            set({ user: await res.data.user, token: await res.data.token });
        },
    }))
);
