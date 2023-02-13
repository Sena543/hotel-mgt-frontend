import "./guest-profile.css";
import { MailOutlineRounded, PersonRounded, PhoneOutlined } from "@mui/icons-material";
import { Icon, Typography } from "@mui/material";

function GuestProfile() {
	return (
		<div className="guest-profile-container">
			<div className="img_name-div display-flex-flex-direction-row">
				<Icon>
					<PersonRounded />
				</Icon>
				{/* <img
					loading="lazy"
					src={"C:/Users/senanuk/Pictures/Screenshot_20230116_025745.png"}
					alt="Guest image"
				/> */}
				<div>
					<Typography style={{ fontSize: "12px" }}>GS-#123</Typography>
					<Typography style={{ fontSize: "14px", fontWeight: "bold" }}>Bruce Wayne</Typography>
				</div>
			</div>
			<div style={{ width: "70%" }}>
				<div className="display-flex-flex-direction-row">
					<Icon>
						<PhoneOutlined />
					</Icon>
					<Typography>+233 123456789</Typography>
				</div>
				<div className="display-flex-flex-direction-row">
					<Icon>
						<MailOutlineRounded />
					</Icon>
					<Typography>dude@gmail.com</Typography>
				</div>
				<div></div>
			</div>
		</div>
	);
}

export default GuestProfile;
