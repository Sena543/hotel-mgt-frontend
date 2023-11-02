import { Suspense } from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";
import PageLoading from "./PageLoading";
import Sidebar from "./Sidebar/Sidebar";

function RootLayout() {
	const isSignedIn = true;

	if (!isSignedIn) {
		return <Navigate to="sign-in" replace />;
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
