import { CloseRounded } from "@mui/icons-material";
import {
    Typography,
    IconButton,
    Divider,
    FormGroup,
    CircularProgress,
    Button,
    Tooltip,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import GenericModal from "../Modal/GenericModal";
import CustomTextField from "../TextInput/CustomTextField";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/types";
import { useEffect, useState } from "react";
import { StaffDetailsType } from "../../constants/genericTypes";
import { updateStaffData, resetStaffStatus } from "../../redux/slices/staffSlices";

type EditStaffDetailsType = {
    open: boolean;
    setOpenModal: Function;
    staffDetailsID: string;
};

function EditStaffDetails({ setOpenModal, open, staffDetailsID }: EditStaffDetailsType) {
    const dispatch = useDispatch<AppDispatch>();
    const { status, staffData } = useSelector((state: RootState) => state.staff);
    const staffDetails = staffData.filter((s) => {
        return s.employeeID === staffDetailsID;
    })[0];

    const [empUpdateData, setEmpUpdateData] = useState<StaffDetailsType>({
        lastName: "",
        firstName: "",
        email: "",
        contact: "",
        jobDescription: "",
        salary: 0,
        jobTitle: "",
        workingDays: [],
        // workingDays: ["Sunday"],
        employeeID: "",
        rawDocID: "",
    });

    useEffect(() => {
        setEmpUpdateData(staffDetails);
    }, [staffDetailsID]);

    const handleChange = (name: keyof typeof empUpdateData, value: string | string[]) => {
        setEmpUpdateData((prev: typeof empUpdateData) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleWorkingDaySelection = (label: string) => {
        let workingDays: string[] = [...empUpdateData?.workingDays];
        const find_inArray = workingDays.includes(label);

        if (find_inArray) {
            workingDays = workingDays.filter((day) => day !== label);
        } else {
            workingDays.push(label);
        }

        handleChange("workingDays", workingDays);
    };

    const submitUpdate = () => {
        const updateDataObj = {
            rawDocID: empUpdateData.rawDocID,
            data: empUpdateData,
        };
        dispatch(updateStaffData(updateDataObj));
        dispatch(resetStaffStatus());
    };

    const weekDays: string[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const renderDaysWithCheckbox = (
        <>
            {weekDays &&
                weekDays.map((day: string) => (
                    <div key={day}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={empUpdateData?.workingDays?.includes(day)}
                                    onChange={(e) => handleWorkingDaySelection(day)}
                                />
                            }
                            label={<Typography variant="h6">{day}</Typography>}
                        />
                    </div>
                ))}
        </>
    );

    return (
        <GenericModal
            className="create-staff-modal-container"
            open={open}
            setOpenModal={setOpenModal}
        >
            <div
                style={{ padding: "auto 10px" }}
                className="create-staff-header generic-flex-justify-content-style"
            >
                <Typography fontWeight={"bolder"} fontSize="25px">
                    Update Staff Details
                </Typography>
                <Tooltip title="Close">
                    <IconButton onClick={() => setOpenModal(false)}>
                        <CloseRounded />
                    </IconButton>
                </Tooltip>
            </div>
            <Divider />
            <div
                className=" create-staff-form"
                style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
            >
                <div style={{}}>
                    <div className="emp-name-div">
                        <CustomTextField
                            autoFocus
                            name="lastName"
                            variant="outlined"
                            // value={staffDetails[0]?.lastName}
                            value={empUpdateData?.lastName}
                            // helperText="Last name is required"
                            className="custom-text-field"
                            label="Last Name"
                            margin="normal"
                            onChange={(e: any) => handleChange(e.target.name, e.target.value)}
                        />
                        <CustomTextField
                            name="firstName"
                            variant="outlined"
                            className="custom-text-field"
                            label="First Name"
                            // error={!guestDetails.firstName}
                            // helperText="First name is required"
                            value={empUpdateData?.firstName}
                            margin="normal"
                            onChange={(e: any) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="staff-contact-div emp-name-div">
                        <CustomTextField
                            name="email"
                            variant="outlined"
                            className="custom-text-field contacts-field email"
                            value={empUpdateData?.email}
                            fullWidth
                            // error={!guestDetails.email}
                            // helperText="email is required"
                            label="Email"
                            margin="normal"
                            onChange={(e: any) => handleChange(e.target.name, e.target.value)}
                        />
                        <CustomTextField
                            name="contact"
                            variant="outlined"
                            fullWidth
                            value={empUpdateData?.contact}
                            className="custom-text-field contacts-field phone-number"
                            label="Phone Number"
                            margin="normal"
                            // error={!guestDetails.contact}
                            // helperText="Contact is required"
                            onChange={(e: any) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="staff-contact-div emp-name-div">
                        <CustomTextField
                            name="salary"
                            variant="outlined"
                            className="custom-text-field contacts-field email"
                            value={empUpdateData?.salary}
                            fullWidth
                            // error={!guestDetails.email}
                            // helperText="email is required"
                            label="Salary"
                            margin="normal"
                            onChange={(e: any) => handleChange(e.target.name, e.target.value)}
                        />
                        <CustomTextField
                            name="jobTitle"
                            variant="outlined"
                            className="custom-text-field contacts-field email"
                            value={empUpdateData?.jobTitle}
                            fullWidth
                            // error={!guestDetails.email}
                            // helperText="email is required"
                            label="Position"
                            margin="normal"
                            onChange={(e: any) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div
                        className="job-details-div "
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CustomTextField
                            name="jobDescription"
                            variant="outlined"
                            fullWidth
                            rows={3}
                            multiline
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "3em auto",
                            }}
                            value={empUpdateData?.jobDescription}
                            className="custom-text-field contacts-field jobDescription"
                            label="Job Description"
                            margin="normal"
                            // error={!guestDetails.contact}
                            // helperText="Contact is required"
                            onChange={(e: any) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>

                    <div className="select-working-days">
                        <FormGroup row className="working-days">
                            {/* {renderDaysWithCheckbox} */}
                        </FormGroup>
                    </div>
                </div>

                <div className="button-div">
                    {status === "loading" ? (
                        <CircularProgress />
                    ) : (
                        <Button
                            onClick={submitUpdate}
                            variant="contained"
                            className="create-guest-button"
                        >
                            Update Details
                        </Button>
                    )}
                </div>
            </div>
            {/* <GenericAlert
                open={alertOpen}
                severity="success"
                setOpen={setAlertOpen}
                message="Operation successfull"
            /> */}
        </GenericModal>
    );
}

export default EditStaffDetails;
