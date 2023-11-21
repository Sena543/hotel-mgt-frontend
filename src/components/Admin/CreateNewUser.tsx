import GenericModal from "../Modal/GenericModal";
import { CloseRounded } from "@mui/icons-material";
import {
    Typography,
    IconButton,
    Divider,
    Tooltip,
    Autocomplete,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Button,
} from "@mui/material";
import CustomTextField from "../TextInput/CustomTextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewUser } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/types";

type CreateUserProps = {
    open: boolean;
    setOpenModal: Function;
};

function CreateNewUser({ open, setOpenModal }: CreateUserProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [userCredentials, setUserCredentials] = useState({
        fullName: "",
        email: "",
        password: "1234567",
        role: "USER",
    });
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentials({ ...userCredentials, role: event.target.value });
    };

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
            createNewUser({
                name: userCredentials.fullName,
                email: userCredentials.email,
                role: userCredentials.role,
                password: userCredentials.password,
            })
        );
    };
    return (
        <GenericModal className="newuser-modal-container" open={open} setOpenModal={setOpenModal}>
            <div
                className="order-modal-header"
                style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
            >
                <Typography variant="h5">Create New User</Typography>
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
                    value={userCredentials.fullName}
                    name="fullName"
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className="custom-text-field-order-modal"
                    label="Full Name"
                />
                <CustomTextField
                    style={{ margin: "1%", width: "80%" }}
                    value={userCredentials.email}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    name="email"
                    className="custom-text-field-order-modal"
                    label="Email"
                />
                <CustomTextField
                    style={{ margin: "1%", width: "80%" }}
                    value={userCredentials.password}
                    name="password"
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className="custom-text-field-order-modal"
                    label="Defalut Password"
                />
                <FormControl style={{ display: "flex", alignItems: "center" }}>
                    <FormLabel id="demo-controlled-radio-buttons-group">User Role</FormLabel>
                    <RadioGroup
                        style={{ display: "flex", flexDirection: "row" }}
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={userCredentials.role}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                        <FormControlLabel value="USER" control={<Radio />} label="User" />
                    </RadioGroup>
                </FormControl>
                <Button onClick={() => submit()} style={{ width: "60%" }} variant="contained">
                    Create
                </Button>
            </div>
        </GenericModal>
    );
}

export default CreateNewUser;
