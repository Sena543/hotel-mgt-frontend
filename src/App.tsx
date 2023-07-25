import "./App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
            <div className="App" data-testid="hello">
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <RouterProvider router={routes} />
                    </ThemeProvider>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={4000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </Provider>
            </div>
    );
}

export default App;
