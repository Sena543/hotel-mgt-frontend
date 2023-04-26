import "./restaurant.css";
import { Button, Typography, Link as MuiLink } from "@mui/material";
import { useEffect, useState } from "react";
import GenericTable from "../../components/Table/GenericTable";
import OrderModal from "../../components/Restaurant/OrderModal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/types";
import { fetchAllGuestBookingHistory } from "../../redux/slices/bookingSlices";

function Restuarant() {
    const dispatch = useDispatch<AppDispatch>();
    const { bookingHistory } = useSelector((state: any) => state.booking);
    // const bookingHistoryData = useSelector((state: any) => console.log(state));
    const [open, setOpenModal] = useState(false);
    const [openMenu, setOpenMenuModal] = useState(false);

    useEffect(() => {
        if (bookingHistory.length === 0) {
            dispatch(fetchAllGuestBookingHistory());
        }
    }, []);
    const restaurantList = [
        { guestid: 1, guestname: "Bruce Wayne", dishordered: "Rice", price: 100 },
        { guestid: 2, guestname: "Lionel Messi", dishordered: "Rice", price: 100 },
        { guestid: 3, guestname: "Cristiano Ronaldo", dishordered: "Rice", price: 100 },
        { guestid: 4, guestname: "Robert Lewandowski", dishordered: "Rice", price: 100 },
    ];

    const header = ["Guest ID", "Guest Name", "Dish Ordered", "Price"];
    return (
        <div className="restaurant-container">
            <div className="restaurant-header">
                <Typography style={{}} fontSize={30} fontWeight="bold">
                    Restaurant
                </Typography>

                <div className="header-button-div">
                    <Link className="menu-link" to={"/restaurant/menu"}>
                        <Button>View Menu</Button>
                    </Link>
                    <Button onClick={() => setOpenModal(true)}>Create Guest Order</Button>
                </div>
            </div>
            <div className="guest-restuarant-orders">
                <GenericTable header={header} tableData={restaurantList} />
            </div>
            <OrderModal open={open} setOpenModal={setOpenModal} />
        </div>
    );
}

export default Restuarant;
