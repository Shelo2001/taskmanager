import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useUsers = create(
    devtools((set) => ({
        users: [],
        user: {},
        token: null,
        loading: false,
        errorUser: null,
        fetch: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/users`
            );
            set({ users: await res.data });
        },
        login: async (data) => {
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_BASE_API_URL}/login`,
                    data
                );
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                set({ user: await res.data.user, token: await res.data.token });
                window.location.href = "/";
            } catch (error) {
                set({
                    errorUser:
                        (await error?.response?.data?.error) ||
                        (await error?.response?.data?.message),
                });
                setTimeout(() => {
                    set({
                        errorUser: null,
                    });
                }, 3000);
            }
        },
        createUser: async (data) => {
            try {
                await axios.post(
                    `${import.meta.env.VITE_BASE_API_URL}/register`,
                    data
                );
                window.location.href = "/admin";
            } catch (error) {
                set({
                    errorUser:
                        (await error?.response?.data?.error) ||
                        (await error?.response?.data?.message),
                });
                setTimeout(() => {
                    set({
                        errorUser: null,
                    });
                }, 3000);
            }
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
        getAllUsers: async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/users/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            set({ users: await res.data });
        },
        getUserById: async (id) => {
            set({ loading: true });
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            set({ user: await res.data, loading: false });
        },
        updateToActive: async (id) => {
            await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/users/active/${id}`
            );
            window.location.reload();
        },
        updateToNonActive: async (id) => {
            await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/users/nonactive/${id}`
            );
            window.location.reload();
        },
    }))
);
