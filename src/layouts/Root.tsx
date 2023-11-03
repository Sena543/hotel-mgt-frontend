import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PageLoading from "./PageLoading";
import Sidebar from "./Sidebar/Sidebar";

function RootLayout() {
	if (!localStorage.getItem("role")) {
		return <Navigate to="sign-in" />;
	}
	return (
		<>
			<Suspense fallback={<PageLoading />}>
				<Sidebar />
				<Outlet />
			</Suspense>
		</>
	);
}

export default RootLayout;
