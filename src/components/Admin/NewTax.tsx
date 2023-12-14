import { CloseRounded } from "@mui/icons-material";
import {
    Typography,
    IconButton,
    Divider,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/types";
import GenericModal from "../Modal/GenericModal";
import CustomTextField from "../TextInput/CustomTextField";
import { createTaxData } from "../../redux/slices/taxes";

type NewTaxTypes = {
    open: boolean;
    setOpenModal: Function;
};
function NewTax({ open, setOpenModal }: NewTaxTypes) {
    const dispatch = useDispatch<AppDispatch>();
    const [userCredentials, setUserCredentials] = useState({
        name: "",
        value: "",
    });

    const handleChange = (name: string, value: string) => {
        setUserCredentials((prev: any) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const submit = () => {
        dispatch(
            createTaxData({
                name: userCredentials.name,
                value: Number(userCredentials.value)/100,
            })
        );
    };
    return (
        <GenericModal className="tax-modal-container" open={open} setOpenModal={setOpenModal}>
            <div
                className="order-modal-header"
                style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
            >
                <Typography variant="h5">Create Tax</Typography>
                <Tooltip title="Close">
                    <IconButton onClick={() => setOpenModal(false)}>
                        <CloseRounded />
                    </IconButton>
                </Tooltip>
            </div>
            <Divider />
            <div
                className="new-user-form"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "2%",
                    alignItems: "center",
                }}
            >
                <CustomTextField
                    style={{ margin: "1%", width: "80%" }}
                    value={userCredentials.name}
                    name="name"
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className="custom-text-field-order-modal"
                    label="Tax Name"
                />
                <CustomTextField
                    style={{ margin: "1%", width: "80%" }}
                    value={userCredentials.value}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    name="value"
                    className="custom-text-field-order-modal"
                    label="Value eg(10). Do not add the % symbol."
                />
                <Button onClick={() => submit()} style={{ width: "60%" }} variant="contained">
                    Create
                </Button>
            </div>
        </GenericModal>
    );
}

export default NewTax;
