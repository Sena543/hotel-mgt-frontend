import { createTheme, responsiveFontSizes } from "@mui/material";

let primaryTheme = createTheme({
	palette: {
		primary: { main: "#80529d" },
	},
});

primaryTheme = responsiveFontSizes(primaryTheme);

export const theme = createTheme(primaryTheme, {
	palette: {
		graph_color: { main: "#f6ae44" },
	},
});
