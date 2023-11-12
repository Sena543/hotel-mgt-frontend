import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import GenericLayout from "../layouts/GenericLayout";
import Menu from "../pages/Restuarant/Menu/Menu";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Inventory from "../pages/Inventory/Inventory";
import Admin from "../pages/Admin/Admin";
import Error from "../pages/Error/Error";
const RoomDetails = lazy(() => import("../pages/Room/RoomDetails/RoomDetails"));
const RootLayout = lazy(() => import("../layouts/Root"));
const Booking = lazy(() => import("../pages/Booking/Booking"));
const Restuarant = lazy(() => import("../pages/Restuarant/Restuarant"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const GuestDetails = lazy(() => import("../pages/Guest/GuestDetails/GuestDetails"));
const Guests = lazy(() => import("../pages/Guest/Guests"));
const Rooms = lazy(() => import("../pages/Room/Rooms"));
const Staff = lazy(() => import("../pages/Staff/Staff"));

export default createBrowserRouter([
	{ path: "/", element: <Booking /> },
	{
		path: "/admin",
		element: <RootLayout />,
		errorElement: <Error />,
		children: [
			{
				path: "",
				element: <Dashboard />,
			},
			{
				path: "/admin/rooms",
				element: <GenericLayout />,
				children: [
					{ path: "", element: <Rooms /> },
					{ path: "roomdetails/:name", element: <RoomDetails /> },
					// { path: "admin/rooms/roomdetails/:name", element: <RoomDetails /> },
				],
			},

			{
				path: "/admin/guests",
				element: <GenericLayout />,
				// element: <Guests />,
				children: [
					{ path: "", element: <Guests /> },
					{ path: "guest_details/:name/:guestID", element: <GuestDetails /> },
					// { path: "/admin/guests", element: <Guests /> },
					// { path: "/admin/guests/guest_details/:name/:guestID", element: <GuestDetails /> },
				],
			},
			// { path: "guests/guest_details/:name", element: <GuestDetails /> },
			{
				path: "/admin/restaurant",
				element: <GenericLayout />,
				// element: <Restuarant />,
				children: [
					{ path: "", element: <Restuarant /> },
					{ path: "menu", element: <Menu /> },
					// { path: "admin/restaurant/menu", element: <Menu /> },
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
				path: "admin-panel",
				element: <Admin />,
			},
		],
	},
	{ path: "sign-up", element: <Signup /> },
	{ path: "sign-in", element: <Login /> },
	// { path: "booking", element: <Booking /> },
]);

// export default createBrowserRouter([])
