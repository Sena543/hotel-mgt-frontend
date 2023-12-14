import React from "react";
import CustomTextField from "../TextInput/CustomTextField";
import { Button, Typography } from "@mui/material";

function Footer() {
    const formFields = [
        {
            fieldName: "fullName",
            name: "Full Name",
        },
        {
            fieldName: "phoneNumber",
            name: "Phone Number",
        },
        {
            fieldName: "email",
            name: "Email",
        },
    ];
    return (
        <div className="booking-footer" id="contactus">
            <div>
                <Typography variant="h3" style={{ color: "#e8ab3a" }}>
                    Get in touch
                </Typography>
            </div>
            <div className="contact-form generic-footer-style">
                <div>
                    <Typography variant="h5" style={{ color: "#80529d" }}>
                        Contact Us
                    </Typography>
                </div>
                {formFields.map(({ fieldName, name }) => (
                    <CustomTextField
                        name={fieldName}
                        key={fieldName}
                        label={name}
                        style={{ margin: "5px" }}
                    />
                ))}
                <CustomTextField label="Message" multiline={true} minRows={4} />
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button variant="contained" style={{ width: "40%", margin: "5px" }}>
                        Send
                    </Button>
                </div>
            </div>
            <div style={{ height: "100%", width: "3px", background: "#cbcbcb" }}></div>
            <div className="generic-footer-style address">
                <div>
                    <Typography variant="h5" style={{ color: "#80529d" }}>
                        Connect with us
                    </Typography>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography style={{ color: "#80529d" }}>Phone</Typography>:
                    <Typography>+1234567890</Typography>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography style={{ color: "#80529d" }}>Address</Typography>:
                    <Typography>New Kalmunai Road, Batticaloa, Sri Lanka</Typography>
                </div>
                <div className="maplocation" style={{ width: "100%", minHeight: "100%" }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.419912096039!2d-0.1529989242404522!3d5.652235332672942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9cacb80b000b%3A0x234093ec85f8ba02!2sAH%20Hotel%20and%20Conference!5e0!3m2!1sen!2sgh!4v1702470442303!5m2!1sen!2sgh"
                        width="100%"
                        height="400"
                        // frameborder={"0"}
                        style={{ border: 0, padding: 0, borderRadius: "5px" }}
                        // allowfullscreen=""
                        aria-hidden="false"
                        loading="lazy"
                        // referrerpolicy="no-referrer-when-downgrade"
                        // tabindex="0"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default Footer;
