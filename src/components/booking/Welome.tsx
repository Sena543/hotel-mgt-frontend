import React from "react";
import welcomeImage from "../../assets/images/welcome-hotel.avif";
import { Typography, colors } from "@mui/material";
import { SouthRounded } from "@mui/icons-material";

export default function Welcome() {
	return (
		<div className="welcome-div home" id="home">
			{/* <img src={welcomeImage} loading="lazy" height={"100%"} width={'100%'} /> */}
			<div>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<Typography style={{ color: "#e8ab3a" }} variant="h1">
						HOTEL
					</Typography>{" "}
					<Typography variant="h1" style={{ color: "#e8ab3a" }}>
						NAME
					</Typography>
				</div>
				<Typography style={{ color: "white" }} variant="h4">
					Welcome to our hotel
				</Typography>
				<Typography style={{ color: "white" }} variant="h4">
					Get accomodations today
				</Typography>
			</div>
			<div style={{ position: "relative", left: "50%", top: "15em" }}>
				<div className="welcome-arrow-down">
					<SouthRounded sx={{ color: "white" }} />
				</div>
			</div>
		</div>
	);
}
