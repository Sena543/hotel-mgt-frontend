import React from "react";
import welcomeImage from "../../assets/images/welcome-hotel.avif";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoomType } from "../Room/RoomList";
import dayjs from "dayjs";

const RoomCard = ({ type, description, rate }: { rate: string; type: string; description: string }) => {
	const navigate = useNavigate();

	return (
		<div key={description} className="room-card">
			<div style={{ minHeight: "150px" }} className="room-card-image-div">
				<img src={welcomeImage} loading="lazy" height={"100%"} width={"100%"} />
			</div>
			<div style={{ minHeight: "120px" }}>
				<div
					style={{
						position: "relative",
						left: "65%",
						width: "fit-content",
						padding: "8px",
						borderRadius: "5px",
						backgroundColor: " rgba(128, 82, 157, 0.8)",
						bottom: "3em",
					}}
				>
					<Typography color={"#fff"} variant="h4">
						{type}
					</Typography>
				</div>
				<Typography>{description}</Typography>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					// minHeight: "100px",
					padding: "10px",
					alignItems: "center",
					justifyContent: "space-around",
				}}
			>
				<Typography variant="h6">${rate}</Typography>
				<Button
					onClick={() =>
						navigate("/sign-up", {
							state: {
								lastName: "",
								firstName: "",
								email: "",
								contact: "",
								checkIn: dayjs(), //today
								checkOut: dayjs().add(1, "day"), //tomorrow
								roomSelected: { roomName: "" } as RoomType,
								numberOfPeople: 0,
							},
						})
					}
					variant="contained"
				>
					Book now
				</Button>
			</div>
		</div>
	);
};

function ExploreRooms() {
	const roomsTypes = [
		{
			type: "Deluxe",
			description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
			rate: "300",
		},
		{
			type: "Luxury",
			description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
			rate: "600",
		},
		{
			type: "Guest",
			description: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
			rate: "220",
		},
		{
			type: "Single",
			description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
			rate: "150",
		},
	];
	return (
		<div id="rooms" className="booking-explore-rooms-section">
			<div style={{ display: "flex", justifyContent: "flex-start", margin: "2%" }}>
				<Typography variant="h3" style={{ color: "#e8ab3a" }}>
					Rooms & Rates
				</Typography>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-around",
					marginTop: "5px",
				}}
			>
				{roomsTypes.map((roomType) => (
					<RoomCard
						key={roomType.type}
						type={roomType.type}
						description={roomType.description}
						rate={roomType.rate}
					/>
				))}
			</div>
		</div>
	);
}

export default ExploreRooms;
