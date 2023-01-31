import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/Root";
import Booking from "./pages/Booking/Booking";
import Rooms from "./pages/Room/Rooms";
import Guests from "./pages/Guest/Guests";
import Concierge from "./pages/Concierge/Concierge";
import Staff from "./pages/Staff/Staff";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
	const routes = createBrowserRouter([
		{
			path: "/",
			element: <RootLayout />,
			children: [
				{
					path: "/",
					element: <Dashboard />,
				},
				{
					path: "rooms",
					element: <Rooms />,
				},
				{
					path: "booking",
					element: <Booking />,
				},
				{
					path: "booking",
					element: <Booking />,
				},
				{
					path: "guests",
					element: <Guests />,
				},
				{
					path: "concierge",
					element: <Concierge />,
				},
				{
					path: "employees",
					element: <Staff />,
				},
			],
		},
	]);

	return (
		<div className="App">
			<RouterProvider router={routes} />
		</div>
	);
}

export default App;
