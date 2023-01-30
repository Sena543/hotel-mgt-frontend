import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layouts/Root";
import Booking from "./pages/Booking/Booking";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
	const routes = createBrowserRouter([
		{
			path: "/",
			element: <Root />,
			children: [
				{
					path: "booking",
					element: <Booking />,
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
