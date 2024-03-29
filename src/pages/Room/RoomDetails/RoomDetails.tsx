import "./room-dets.css";
import Carousel from "react-elastic-carousel";
import { Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import GenericDashCards from "../../../components/Cards/GenericDashCards";
import CarouselImage from "../../Guest/GuestDetails/CarouselImage";
import UnderConstruction from "../../../components/UnderConstruction";
import UploadImageModal from "./UploadImageModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/types";

function RoomDetails() {
    const { name } = useParams();
    const roomData = useSelector(
        (state: RootState) => state.rooms.roomList.filter(({ roomName }) => roomName === name)[0]
    );
    const [openModal, setopenModal] = useState(false);

    return (
        <div className="restaurant-container">
            <div className="booking-history-div">
                <Typography style={{ marginRight: "5px" }} fontSize={30} fontWeight="bold">
                    Room Details
                </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginBottom: "25px" }}>
                <Link to={"/admin/rooms"} style={{ textDecoration: "none" }}>
                    <Typography style={{ marginRight: "3px" }}>Room / </Typography>
                </Link>
                <Typography>{name}</Typography>
            </div>
            <div>
                <GenericDashCards>
                    <div
                        style={{
                            width: "100%",
                            padding: "1%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h5">Room Images</Typography>

                        <Button onClick={() => setopenModal(true)}>Add Image</Button>
                    </div>
                    <Carousel
                        style={{ width: "100%", marginTop: "5%" }}
                        className="carousel-container"
                        itemsToShow={3.5}
                        itemsToScroll={1}
                        isRTL={false}
                    >
                        {roomData.imageUrls.map((url, index) => (
                            <div key={url} className="room-images">
                                <CarouselImage imgUrl={url} index={index} />
                                <div className="img-delete-button">
                                    <Button>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </GenericDashCards>
            </div>
            <div className="room-details-card-div">
                <GenericDashCards className="card-1">
                    {/* <UnderConstruction /> */}
                    <Typography variant="h5">Room Details</Typography>
                    <div className="room-specific-details">
                        <Typography>Room Name</Typography>
                        <Typography>{roomData.roomName}</Typography>
                    </div>
                    <div className="room-specific-details">
                        <Typography>Capacity</Typography>
                        <Typography>{roomData.roomCapacity}</Typography>
                    </div>
                    <div className="room-specific-details">
                        <Typography>Bed Type</Typography>
                        <Typography>{roomData.bedType}</Typography>
                    </div>
                    <div className="room-specific-details">
                        <Typography>Status</Typography>
                        <Typography>{roomData.status}</Typography>
                    </div>
                </GenericDashCards>
                {/* <GenericDashCards> */}
                {/* <div></div> */}
                {/* </GenericDashCards> */}
            </div>
            <UploadImageModal open={openModal} setModalOpen={setopenModal} roomData={roomData} />
        </div>
    );
}

export default RoomDetails;
