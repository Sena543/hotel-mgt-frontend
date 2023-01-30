import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

function RootLayout() {
	return (
		<>
			<Sidebar />
			<Outlet />
		</>
	);
}

export default RootLayout;
