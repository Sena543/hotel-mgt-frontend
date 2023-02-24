import "./App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/theme";

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<RouterProvider router={routes} />
			</ThemeProvider>
		</div>
	);
}

export default App;
