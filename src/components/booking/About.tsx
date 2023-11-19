import React from "react";
import welcomeImage from "../../assets/images/welcome-hotel.avif";
import { Typography } from "@mui/material";

function About() {
	return (
		<div className="booking-about-section about" id="about">
			<div className="about-div">
				<div>
					<Typography variant="h4" style={{ color: "#e8ab3a" }}>
						About Us
					</Typography>
				</div>
				<div>
					<Typography>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus cum fugit excepturi
						temporibus nostrum officia debitis autem cumque soluta? Molestiae nostrum sequi maxime minima
						quo harum tempora aspernatur deserunt possimus!
					</Typography>
				</div>
			</div>
			<div className="about-image-div">
				<img src={welcomeImage} loading="lazy" height={"100%"} width={"100%"} />
			</div>
		</div>
	);
}

export default About;
