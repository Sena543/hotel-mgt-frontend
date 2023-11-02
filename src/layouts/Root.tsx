import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PageLoading from "./PageLoading";
import Sidebar from "./Sidebar/Sidebar";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import { useSelector } from "react-redux";

function RootLayout() {
	const signedIn = localStorage.getItem("role");
	const navigate = useNavigate();
	const user = useSelector((state: any) => state.auth.authData);
	if (signedIn) {
		navigate("/login");
	}
	return (
		<>
			{/* {signedIn ? ( */}
			<Suspense fallback={<PageLoading />}>
				<Sidebar />
				<Outlet />
			</Suspense>
			{/* ) : ( */}
			{/* <Login /> */}
			{/* )} */}
		</>
	);
}

export default RootLayout;
