import React from "react";
import CustomTextField from "../TextInput/CustomTextField";
import { Button, Typography } from "@mui/material";

function Footer() {
	const formFields = [
		{
			fieldName: "fullName",
			name: "Full Name",
		},
		{
			fieldName: "phoneNumber",
			name: "Phone Number",
		},
		{
			fieldName: "email",
			name: "Email",
		},
	];
	return (
		<div className="booking-footer" id="contactus">
			<div>
				<Typography variant="h3" style={{ color: "#e8ab3a" }}>
					Get in touch
				</Typography>
			</div>
			<div className="contact-form generic-footer-style">
				<div>
					<Typography variant="h5" style={{ color: "#80529d" }}>
						Contact Us
					</Typography>
				</div>
				{formFields.map(({ fieldName, name }) => (
					<CustomTextField name={fieldName} key={fieldName} label={name} style={{ margin: "5px" }} />
				))}
				<CustomTextField label="Message" multiline={true} minRows={4} />
				<div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<Button variant="contained" style={{ width: "40%", margin: "5px" }}>
						Send
					</Button>
				</div>
			</div>
			<div style={{ height: "100%", width: "3px", background: "#cbcbcb" }}></div>
			<div className="generic-footer-style address">
				<div>
					<Typography variant="h5" style={{ color: "#80529d" }}>
						Connect with us
					</Typography>
				</div>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<Typography style={{ color: "#80529d" }}>Phone</Typography>:<Typography>+1234567890</Typography>
				</div>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<Typography style={{ color: "#80529d" }}>Address</Typography>:
					<Typography>New Kalmunai Road, Batticaloa, Sri Lanka</Typography>
				</div>
			</div>
		</div>
	);
}

export default Footer;
