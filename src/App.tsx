import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layouts/Root";
import Booking from "./pages/Booking/Booking";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
	const [count, setCount] = useState(0);

	const routes = createBrowserRouter([
		{
			path: "/",
			element: <Dashboard />,
			// children: [
			// 	{
			// 		path: "booking",
			// 		element: <Booking />,
			// 	},
			// ],
		},
		{
			path: "booking",
			element: <Booking />,
		},
	]);

	return (
		<div className="App">
			<Root />
			<RouterProvider router={routes} />
		</div>
	);
}

export default App;
