import "./guest-profile.css";
import {
    CheckRounded,
    CloseRounded,
    MailOutlineRounded,
    PersonRounded,
    PhoneOutlined,
} from "@mui/icons-material";
import { Button, Icon, Typography } from "@mui/material";
// import imgSvg from "../../../assets/react.svg";
import profile from "../../../assets/images/profile.jpg";
import { GuestsType } from "../../../constants/genericTypes";
import { checkGuestStatus } from "../../../utils/util-functions";
import { useEffect, useState } from "react";
import GuestInvoice from "./GuestInvoice";
import { PaystackButton, usePaystackPayment } from "react-paystack";
import paystackConfig, { onClose, onSucess } from "../../../utils/paystackConfig";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/types";
import { fetchAllGuestBookingHistory } from "../../../redux/slices/bookingSlices";
import { fetchRestaurantMenu } from "../../../redux/slices/restaurantSlice";
import { fetchTaxeData } from "../../../redux/slices/taxes";
import { processVariousData } from "../../../utils/computeItems";
import { saveGuestPaymentReference } from "../../../redux/slices/guestSlices";
import { useNavigate, useParams } from "react-router-dom";

//TODO
// fix guest status - reserved, checkout or checked in
function GuestProfile({ profileDetails }: { profileDetails: GuestsType }) {
    const navigate = useNavigate();
    const { name, guestID } = useParams();
    const [viewInvoice, setViewInvoice] = useState(false);
    const taxes = useSelector((state: RootState) => state.tax.taxes);
    const dispatch = useDispatch<AppDispatch>();
    const guestRoomStayed = useSelector((state: RootState) =>
        state.rooms.roomList.filter((room) => {
            return room.roomName === profileDetails?.roomAssigned;
        })
    );
    const restaurantMeals = useSelector((state: RootState) => state.restaurant.restaurantMealsList);
    const guestBookingDetails = useSelector((state: RootState) =>
        state.booking.bookingHistory.filter((booking) => {
            return booking.guestID === profileDetails?.guestID;
        })
    );

    useEffect(() => {
        if (taxes.length === 0) {
            dispatch(fetchTaxeData());
        }
        if (restaurantMeals.length === 0) {
            dispatch(fetchRestaurantMenu());
        }
        if (guestBookingDetails.length === 0) {
            dispatch(fetchAllGuestBookingHistory());
        }
    }, [dispatch]);

    const { overallAmount, subSum, taxAmount } = processVariousData(
        guestRoomStayed,
        guestBookingDetails[0],
        restaurantMeals,
        taxes,
        profileDetails
    );
    const initializePayment = usePaystackPayment(
        paystackConfig(profileDetails, Number(overallAmount))
    );

    const handlePayment = () => {
        initializePayment(() => {
            //on transaction success this function is ran
            //placed directly here because of dispatch hook
            // onSucess(paystackConfig(profileDetails, Number(overallAmount)).reference!);
            dispatch(
                saveGuestPaymentReference({
                    reference: paystackConfig(profileDetails, Number(overallAmount)).reference!,
                    rawDocID: profileDetails.rawDocID,
                })
            );
            navigate(`/admin/guests/guest_details/${name}/${guestID}`);
        }, onClose);
    };

    return (
        <div className="guest-profile-container">
            <div className="img_name-div display-flex-flex-direction-row">
                <img className="profile-img" loading="lazy" src={profile} alt="Guest image" />
                <div>
                    <Typography style={{ fontSize: "15px" }}>GS-#123</Typography>
                    <Typography
                        style={{ fontSize: "25px", fontWeight: "bold" }}
                    >{`${profileDetails?.lastName} ${profileDetails?.firstName}`}</Typography>
                </div>
            </div>
            <div>
                <Typography
                    className={`${
                        checkGuestStatus(profileDetails?.checkOut) ? "checkedOut" : "checkedIn"
                    }`}
                    style={{
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 5,
                    }}
                >
                    {checkGuestStatus(profileDetails?.checkOut) ? "Checked Out" : "Checked In"}
                </Typography>
            </div>
            <div style={{}}>
                <div className="display-flex-flex-direction-row">
                    <Icon>
                        <PhoneOutlined />
                    </Icon>
                    <Typography>{profileDetails?.contact}</Typography>
                </div>
                <div className="display-flex-flex-direction-row">
                    <Icon>
                        <MailOutlineRounded />
                    </Icon>
                    <Typography>{profileDetails?.email}</Typography>
                </div>
            </div>
            <div style={{ width: "90%" }}>
                <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                    Bill Summary
                </Typography>
                <div>
                    <div className="guest-charges">
                        <Typography>Sub Total</Typography>
                        <Typography>{subSum}</Typography>
                    </div>
                    <div className="guest-charges">
                        <Typography>Taxes</Typography>
                        <Typography>{taxAmount}</Typography>
                    </div>
                    <div className="guest-charges">
                        <Typography>Amount Due</Typography>
                        <Typography style={{ fontWeight: "bold" }}>{overallAmount}</Typography>
                    </div>
                </div>
            </div>
            <div style={{ width: "90%" }}>
                <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                    Payment Details
                </Typography>
                <div className="guest-charges payment-mode">
                    <Typography>Bill settled</Typography>
                    {/* <Typography style={{}}>Yes</Typography> */}
                    {profileDetails?.reference ? (
                        <CheckRounded style={{ color: "#0d5ade" }} />
                    ) : (
                        <CloseRounded style={{ color: "red" }} />
                    )}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                }}
            >
                <Button
                    onClick={() => {
                        setViewInvoice(!viewInvoice);
                    }}
                    variant="contained"
                >
                    View Invoice
                </Button>
                {!profileDetails?.reference ? (
                    <Button variant="contained" onClick={handlePayment}>
                        Settle Bill
                    </Button>
                ) : null}
                {/* <Button variant="contained" onClick={handlePayment}>
                    Settle Bill
                </Button> */}
            </div>
            <GuestInvoice
                open={viewInvoice}
                setOpen={setViewInvoice}
                guestDetails={profileDetails}
            />
        </div>
    );
}

export default GuestProfile;
