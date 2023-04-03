import "./App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/theme";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<div className="App">
					<RouterProvider router={routes} />
				</div>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
