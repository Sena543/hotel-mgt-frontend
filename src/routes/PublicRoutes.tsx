import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";

function PublicRoutes() {
	return [
		{ path: "sign-up", element: <Signup /> },
		{ path: "sign-in", element: <Login /> },
	];
}

export default PublicRoutes;
