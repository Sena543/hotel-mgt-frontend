import notFoundImg from "../../assets/page-not-found.svg";
import { Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

function Error() {
	const error: unknown = useRouteError();

	console.error(error);
	return (
		<div style={{ display: "grid", placeContent: "center", marginTop: "6%" }}>
			<Typography variant="h5">Oops. That page could not be found.</Typography>
			<div>
				<img src={notFoundImg} alt="Page not found" />
			</div>
			<Typography variant="h6">
				{(error as Error)?.message || (error as { statusText?: string })?.statusText}
			</Typography>
		</div>
	);
}

export default Error;
