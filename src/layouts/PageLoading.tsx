import { CircularProgress } from "@mui/material";
import React from "react";

function PageLoading() {
    return (
        <div style={{ width: "100%", height: "100%", display: "grid", placeContent: "center" }}>
            <CircularProgress size={80} />
        </div>
    );
}

export default PageLoading;
