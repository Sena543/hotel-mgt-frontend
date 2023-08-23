import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import PageLoading from "./PageLoading";
import Sidebar from "./Sidebar/Sidebar";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

function RootLayout() {
    const signedIn = true;
    return (
        <>
            {signedIn ? (
                <Suspense fallback={<PageLoading />}>
                    <Sidebar />
                    <Outlet />
                </Suspense>
            ) : (
                <Login />
            )}
        </>
    );
}

export default RootLayout;
