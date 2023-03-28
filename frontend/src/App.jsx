import React from "react";
import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import AdminUsers from "./pages/AdminUsers";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Task from "./pages/Task";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/task/:id",
                element: <Task />,
            },
            {
                path: "/admin",
                element: <AdminUsers />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);

export default router;
