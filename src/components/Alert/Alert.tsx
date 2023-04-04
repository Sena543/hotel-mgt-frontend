import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";
import Grow, { GrowProps } from "@mui/material/Grow";

type AlertProps = {
	severity: AlertColor | undefined;
	message: string;
	open: boolean;
	setOpen: Function;
};

function GrowTransition(props: GrowProps) {
	return <Grow {...props} />;
}

function GenericAlert({ open, setOpen, severity, message }: AlertProps) {
	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<Snackbar
			open={open}
			onClose={handleClose}
			autoHideDuration={4000}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			TransitionComponent={GrowTransition}
		>
			<Alert onClose={handleClose} variant="outlined" severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	);
}

export default GenericAlert;
