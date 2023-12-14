import "./add-inventory.css";
import { CloseRounded } from "@mui/icons-material";
import {
    Typography,
    IconButton,
    Divider,
    Autocomplete,
    CircularProgress,
    Button,
    Tooltip,
    RadioGroup,
    FormControl,
    FormLabel,
    Radio,
    FormControlLabel,
} from "@mui/material";
import React from "react";
import GenericModal from "../Modal/GenericModal";
import CustomTextField from "../TextInput/CustomTextField";
import { DatePicker } from "@mui/x-date-pickers";
import { DateValidationError, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type AddInventoryProp = {
    open: boolean;
    setOpenModal: Function;
};

function AddInventory({ open, setOpenModal }: AddInventoryProp) {
    const inventoryCategory = ["Food", "Beverage"];
    return (
        <GenericModal className="inventory-modal-container" open={open} setOpenModal={setOpenModal}>
            <div className="header">
                <Typography variant="h5">New Inventory Item</Typography>
                <Tooltip title="Close">
                    <IconButton onClick={() => setOpenModal(false)}>
                        <CloseRounded />
                    </IconButton>
                </Tooltip>
            </div>
            <Divider />
            <div className="new-inventory-form">
                <div className="basic-data">
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-evenly",
                            margin: "15px",
                        }}
                    >
                        <CustomTextField label="Item Name" value={""} className="basic-datafield" />
                        <CustomTextField label="Location" value={""} className="basic-datafield" />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-evenly",
                            margin: "15px",
                        }}
                    >
                        <CustomTextField
                            label="Quantity Available"
                            value={""}
                            className="basic-datafield"
                        />
                        <CustomTextField
                            label="Serial Number"
                            value={""}
                            className="basic-datafield"
                        />
                    </div>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={inventoryCategory}
                        sx={{ width: "92%" }}
                        renderInput={(params) => <CustomTextField {...params} label="Category" />}
                    />
                    <FormControl className="perisable-form-control-group">
                        <FormLabel>Is Perishable?</FormLabel>
                        <RadioGroup
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                            }}
                            defaultValue={"No"}
                        >
                            <FormControlLabel value={"Yes"} control={<Radio />} label="Yes" />
                            <FormControlLabel value={"No"} control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disablePast
                            format="MM-DD-YYYY"
                            label="Expiration Date"
                            // value={dayjs(guestDetails.checkOut, "MM-DD-YYYY")}
                            // onError={(newError) => setDateError(newError)}
                            // onChange={(dateValue) => {
                            //     handleDateChange("checkOut", dateValue);
                            //     setDateError(null);
                            // }}
                            // slotProps={{
                            //     textField: {
                            //         helperText: errorMessage,
                            //     },
                            // }}
                            sx={{ width: "92%", marginTop: "2em" }}
                            className="custom-text-field contacts-field date-picker"
                        />
                    </LocalizationProvider>
                    <Button variant="contained" style={{ marginTop: "1em", width: "50%" }}>
                        Add Item
                    </Button>
                </div>
            </div>
        </GenericModal>
    );
}

export default AddInventory;
