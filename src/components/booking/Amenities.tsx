import React from "react";
import welcomeImage from "../../assets/images/welcome-hotel.avif";
import { Typography } from "@mui/material";
import { BusinessRounded, FreeBreakfastRounded, HotelRounded, WifiRounded } from "@mui/icons-material";

// const RoomCard = ({ type, description }: { type: string; description: string }) => {
// 	return (
// 		<div className="room-card">
// 			<div style={{ minHeight: "150px" }} className="room-card-image-div">
// 				<img src={welcomeImage} loading="lazy" height={"100%"} width={"100%"} />
// 			</div>
// 			<div style={{ minHeight: "150px" }}>
// 				<Typography>{type}</Typography>
// 				<Typography>{description}</Typography>
// 			</div>
// 		</div>
// 	);
// };

const AmenitiesCard = ({ icon, name }: { name: string; icon: React.ReactNode }) => {
	return (
		<div className="amenities-card">
			{/* <div style={{ minHeight: "150px" }} className="room-card-image-div">
				<img src={welcomeImage} loading="lazy" height={"100%"} width={"100%"} />
			</div> */}
			{/* <div style={{ minHeight: "150px" }}> */}
			<div>{icon}</div>
			<Typography variant="h5" style={{ color: "#80529d" }}>
				{name}
			</Typography>
			{/* </div> */}
		</div>
	);
};

function Amenities() {
	const amenitiesTypes = [
		{
			name: "Master Bedrooms",
			icon: <HotelRounded sx={{ fontSize: 100, color: "#e8ab3a" }} />,
		},
		{
			name: "Serene Views",
			icon: <BusinessRounded sx={{ fontSize: 100, color: "#e8ab3a" }} />,
		},
		{
			name: "Free Beverages",
			icon: <FreeBreakfastRounded sx={{ fontSize: 100, color: "#e8ab3a" }} />,
		},
		{
			name: "Wifi Coverage",
			icon: <WifiRounded sx={{ fontSize: 100, color: "#e8ab3a" }} />,
		},
	];

	return (
		<div className="booking-explore-rooms-section amenities-container">
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0.5%" }}>
				<Typography variant="h2" style={{ color: "#e8ab3a" }}>
					Amenities
				</Typography>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					margin: "1%",
				}}
			>
				<Typography variant="h5">EXPERIENCE A GOOD STAY, ENJOY FANTASTIC OFFERS</Typography>
				<Typography variant="h6">FIND OUR FRIENDLY WELCOMING RECEPTION</Typography>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-around",
					marginTop: "5px",
					width: "100%",
				}}
			>
				{amenitiesTypes.map(({ name, icon }) => (
					<AmenitiesCard key={name} name={name} icon={icon} />
				))}
			</div>
		</div>
	);
}

export default Amenities;
