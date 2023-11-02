import { Dashboard, Inventory } from "@mui/icons-material";
import Menu from "../pages/Restuarant/Menu/Menu";
import GenericLayout from "../layouts/GenericLayout";
import RootLayout from "../layouts/Root";
import Admin from "../pages/Admin/Admin";
import Booking from "../pages/Booking/Booking";
import GuestDetails from "../pages/Guest/GuestDetails/GuestDetails";
import Guests from "../pages/Guest/Guests";
import Restuarant from "../pages/Restuarant/Restuarant";
import Rooms from "../pages/Room/Rooms";
import Staff from "../pages/Staff/Staff";

function ProtectedRoutes() {
	return {
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
				path: "guests",
				element: <GenericLayout />,
				// element: <Guests />,
				children: [
					{ path: "/guests", element: <Guests /> },
					{ path: "guest_details/:name/:guestID", element: <GuestDetails /> },
				],
			},
			// { path: "guests/guest_details/:name", element: <GuestDetails /> },
			{
				path: "restaurant",
				element: <GenericLayout />,
				// element: <Restuarant />,
				children: [
					{ path: "/restaurant", element: <Restuarant /> },
					{ path: "menu", element: <Menu /> },
				],
			},
			// { path: "restaurant/menu", element: <Menu /> },
			{
				path: "employees",
				element: <Staff />,
			},
			{
				path: "inventory",
				element: <Inventory />,
			},
			{
				path: "admin",
				element: <Admin />,
			},
		],
	};
}

export default ProtectedRoutes;
