import "./guest-profile.css";
import { MailOutlineRounded, PersonRounded, PhoneOutlined } from "@mui/icons-material";
import { Button, Icon, Typography } from "@mui/material";
// import imgSvg from "../../../assets/react.svg";
import profile from "../../../assets/images/profile.jpg";
import { GuestsType } from "../../../constants/genericTypes";
import { checkGuestStatus } from "../../../utils/util-functions";
import { useState } from "react";
import GuestInvoice from "./GuestInvoice";
import { PaystackButton, usePaystackPayment } from "react-paystack";
import paystackConfig from "../../../utils/paystackConfig";

//TODO
// fix guest status - reserved, checkout or checked in
function GuestProfile({ profileDetails }: { profileDetails: GuestsType }) {
    // console.log(profileDetails)
    const [viewInvoice, setViewInvoice] = useState(false);
    const initializePayment = usePaystackPayment(paystackConfig(profileDetails));

    // const componentProps = {
    //     email: profileDetails?.email,
    //     // amount: computeOverallSum(taxes, sum + otherChargesSum()).toFixed(2),
    //     amount: 1000,
    //     metadata: {
    //         name: `${profileDetails?.lastName} ${profileDetails?.firstName}`,
    //         phone: profileDetails?.contact,
    //     },
    //     publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    //     text: "Buy Now",
    //     onSuccess: ({ reference }: { reference: string }) => {
    //         alert(`Your purchase was successful! Transaction reference: ${reference}`);
    //     },
    //     onClose: () => alert("Wait! You need this oil, don't go!!!!"),
    // };
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
                        <Typography>Room charges</Typography>
                        <Typography>20000</Typography>
                    </div>
                    <div className="guest-charges">
                        <Typography>Taxes</Typography>
                        <Typography>122323</Typography>
                    </div>
                    <div className="guest-charges">
                        <Typography>Amount Due</Typography>
                        <Typography style={{ fontWeight: "bold" }}>19899823</Typography>
                    </div>
                </div>
            </div>
            <div style={{ width: "90%" }}>
                <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                    Payment Details
                </Typography>
                <div className="guest-charges payment-mode">
                    <Typography>Bill settled</Typography>
                    <Typography style={{}}>Yes</Typography>
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
                <Button variant="contained">Settle Bill</Button>
                {/* <PaystackButton className="paystack-button" {...componentProps} /> */}
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
