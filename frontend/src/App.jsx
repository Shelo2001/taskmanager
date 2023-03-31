import React from "react";
import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import AdminUsers from "./pages/AdminUsers";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import TableView from "./pages/TableView";
import Task from "./pages/Task";
import CreateUser from "./pages/CreateUser";

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
            {
                path: "/tasks/table",
                element: <TableView />,
            },
            {
                path: "/chat/:id",
                element: <Chat />,
            },
            {
                path: "/admin/create",
                element: <CreateUser />,
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
    {
        path: "/*",
        element: <NotFound />,
    },
]);

export default router;
