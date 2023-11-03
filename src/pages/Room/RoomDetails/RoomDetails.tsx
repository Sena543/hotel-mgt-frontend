import "./room-dets.css";
import Carousel from "react-elastic-carousel";
import { Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import GenericDashCards from "../../../components/Cards/GenericDashCards";
import CarouselImage from "../../Guest/GuestDetails/CarouselImage";
import UnderConstruction from "../../../components/UnderConstruction";

function RoomDetails() {
    const { name } = useParams();

    const imgs = [
        {
            url: "https://images.pexels.com/photos/13748845/pexels-photo-13748845.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            url: "https://images.pexels.com/photos/14656123/pexels-photo-14656123.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            url: "https://images.pexels.com/photos/13748895/pexels-photo-13748895.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },

        {
            url: "https://images.pexels.com/photos/11856438/pexels-photo-11856438.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            url: "https://images.pexels.com/photos/14656124/pexels-photo-14656124.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            url: "https://images.pexels.com/photos/13748835/pexels-photo-13748835.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
    ];
    return (
        <div className="restaurant-container">
            <div className="booking-history-div">
                <Typography style={{ marginRight: "5px" }} fontSize={30} fontWeight="bold">
                    Room Details
                </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginBottom: "25px" }}>
                <Link to={"/rooms"} style={{ textDecoration: "none" }}>
                    <Typography style={{ marginRight: "3px" }}>Room / </Typography>
                </Link>
                <Typography>{name}</Typography>
            </div>
            <div>
                <GenericDashCards>
                    <Carousel
                        className="carousel-container"
                        itemsToShow={2.3}
                        itemsToScroll={2}
                        isRTL={false}
                    >
                        {imgs.map(({ url }, index) => (
                            <div className="room-images">
                                <CarouselImage key={url} imgUrl={url} index={index} />
                                <div className="img-delete-button">
                                    <Button>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </GenericDashCards>
            </div>
            <div>
                <Typography>Room Details</Typography>
                <GenericDashCards>
                    <UnderConstruction />
                </GenericDashCards>
            </div>
        </div>
    );
}

export default RoomDetails;