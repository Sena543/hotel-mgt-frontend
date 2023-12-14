import React from "react";
import underConstruction from "../assets/svgs/Under construction-amico.svg";
import { Typography } from "@mui/material";

export default function UnderConstruction() {
    return (
        <div>
            <img
                style={{ width: "50%", height: "50%" }}
                className="constructionImage"
                src={underConstruction}
                alt="Under construction image"
            />
            <Typography>This page is under construction. Please, check back later</Typography>
        </div>
    );
}
