import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PageLoading from "./PageLoading";
import Sidebar from "./Sidebar/Sidebar";

function RootLayout() {
    if (!localStorage.getItem("role")) {
        return <Navigate to="sign-in" />;
    }
    return (
        <div style={{ margin: "0 auto", padding: "2rem" }}>
            <Suspense fallback={<PageLoading />}>
                <Sidebar />
                <div style={{marginLeft:'6%'}}>
                    <Outlet />
                </div>
            </Suspense>
        </div>
    );
}

export default RootLayout;
