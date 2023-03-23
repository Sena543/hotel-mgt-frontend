import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Menu from "../pages/Restuarant/Menu/Menu";
const RootLayout = lazy(() => import("../layouts/Root"));
const Booking = lazy(() => import("../pages/Booking/Booking"));
const Restuarant = lazy(() => import("../pages/Restuarant/Restuarant"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const GuestDetails = lazy(() => import("../pages/Guest/GuestDetails/GuestDetails"));
const Guests = lazy(() => import("../pages/Guest/Guests"));
const Rooms = lazy(() => import("../pages/Room/Rooms"));
const Staff = lazy(() => import("../pages/Staff/Staff"));

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
				path: "restaurant",
				element: <Restuarant />,
				// children: [{ path: "menu", element: <Menu /> }],
			},
			{ path: "restaurant/menu", element: <Menu /> },
			{
				path: "employees",
				element: <Staff />,
			},
		],
	},
]);
