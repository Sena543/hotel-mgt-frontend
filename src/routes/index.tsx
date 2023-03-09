import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/Root";
import Booking from "../pages/Booking/Booking";
import Concierge from "../pages/Concierge/Concierge";
import Dashboard from "../pages/Dashboard/Dashboard";
import GuestDetails from "../pages/Guest/GuestDetails/GuestDetails";
import Guests from "../pages/Guest/Guests";
import Rooms from "../pages/Room/Rooms";
import Staff from "../pages/Staff/Staff";

export default createBrowserRouter([
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
			// {
			// 	path: "booking",
			// 	element: <Booking />,
			// },
			{
				path: "guests",
				element: <Guests />,
				// children: [{ path: "guest_details/:name", element: <GuestDetails /> }],
			},
			{ path: "guests/guest_details/:name", element: <GuestDetails /> },
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
