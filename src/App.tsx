import "./App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<RouterProvider router={routes} />
			</div>
		</ThemeProvider>
	);
}

export default App;
