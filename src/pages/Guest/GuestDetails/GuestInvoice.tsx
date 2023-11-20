import React from "react";
import "./invoice.css";
import GenericModal from "../../../components/Modal/GenericModal";
import { Modal, Typography } from "@mui/material";

function GuestInvoice({ open, setOpen }: { open: boolean; setOpen: Function }) {
    // return <div className="invoice-container">GuestInvoice</div>;
    return (
        <div className="invoice-container">
            <Modal open={open} onClose={() => setOpen(false)} className="invoice-modal">
                <div className="invoice-header">
                    <Typography>Invoice</Typography>
                </div>
            </Modal>
        </div>
    );
}

export default GuestInvoice;
