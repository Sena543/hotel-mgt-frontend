import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import PageLoading from "./PageLoading";
import Sidebar from "./Sidebar/Sidebar";

function RootLayout() {
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
