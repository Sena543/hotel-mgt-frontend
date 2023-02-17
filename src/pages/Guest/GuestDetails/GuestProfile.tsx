import "./guest-profile.css";
import { MailOutlineRounded, PersonRounded, PhoneOutlined } from "@mui/icons-material";
import { Icon, Typography } from "@mui/material";
// import imgSvg from "../../../assets/react.svg";
import profile from "../../../assets/images/profile.jpg";
import { useParams } from "react-router-dom";

function GuestProfile() {
	const { name } = useParams();
	return (
		<div className="guest-profile-container">
			<div className="img_name-div display-flex-flex-direction-row">
				<img className="profile-img" loading="lazy" src={profile} alt="Guest image" />
				<div>
					<Typography style={{ fontSize: "15px" }}>GS-#123</Typography>
					<Typography style={{ fontSize: "25px", fontWeight: "bold" }}>{name}</Typography>
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
