import { createTheme } from "@mui/material";

const primaryTheme = createTheme({
	palette: {
		primary: { main: "#80529d" },
	},
});

export const theme = createTheme(primaryTheme, {
	palette: {
		graph_color: { main: "#f6ae44" },
	},
});
