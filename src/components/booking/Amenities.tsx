import React from "react";
import welcomeImage from "../../assets/images/welcome-hotel.avif";
import { Typography } from "@mui/material";

const RoomCard = ({ type, description }: { type: string; description: string }) => {
    return (
        <div className="room-card">
            <div style={{ minHeight: "150px" }} className="room-card-image-div">
                <img src={welcomeImage} loading="lazy" height={"100%"} width={"100%"} />
            </div>
            <div style={{ minHeight: "150px" }}>
                <Typography>{type}</Typography>
                <Typography>{description}</Typography>
            </div>
        </div>
    );
};

function Amenities() {
    const roomsTypes = [
        {
            type: "Lorem Ipsum Room",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
        },
        {
            type: "Lorem Ipsum Room",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
        },
        {
            type: "Lorem Ipsum Room",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
        },
    ];
    return (
        <div className="booking-explore-rooms-section">
            <div style={{ display: "flex", justifyContent: "flex-start", margin: "2%" }}>
                <Typography variant="h4">Rooms & Suites</Typography>
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
                    <RoomCard type={roomType.type} description={roomType.description} />
                ))}
            </div>
        </div>
    );
}

export default Amenities;
