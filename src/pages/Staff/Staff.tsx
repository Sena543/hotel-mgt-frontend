import {
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Button,
    IconButton,
    Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./staff.css";
import { StyledTableCell, StyledTableRow } from "../../components/Table/TableComp";
// import { employeeData } from "../../services/employee-data";
import CreateStaffModal from "../../components/staff/CreateStaffModal";
import { fetchAllStaff } from "../../redux/slices/staffSlices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/types";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import EditStaffDetails from "../../components/staff/EditStaffDetails";
import { StaffDetailsType } from "../../constants/genericTypes";

function Staff() {
    const dispatch = useDispatch<AppDispatch>();
    const { staffData } = useSelector((state: any) => state.staff);
    const [selectedHeader, setSelectedHeader] = useState<string>("all");
    const [openModal, setOpenModal] = useState(false);
    const [editModal, setEditModal] = useState({
        openEditModal: false,
        selectedStaffID: "",
    });
    const user = useSelector((state: any) => state.auth.authData);

    useEffect(() => {
        dispatch(fetchAllStaff());
    }, []);

    const headers = [
        { name: "All Employees", value: "all" },
        { name: "Active Employees", value: "active" },
        { name: "Inactive Employees", value: "inactive" },
    ];
    const tableheader = ["Employees Name", "Job Title", "Schedule", "Contact", "Status", "Actions"];

    const filterEmployees = () => {
        const currentWeekDay = new Date().toLocaleDateString("en-us", { weekday: "long" });
        //return which employees are active on the current day
        //useful if shift system is ran
        if (selectedHeader === "active") {
            return staffData.filter(
                ({ workingDays }: { workingDays: string }) =>
                    workingDays.includes(currentWeekDay) === true
            );
        }
        if (selectedHeader === "inactive") {
            return staffData.filter(
                ({ workingDays }: { workingDays: string }) =>
                    workingDays.includes(currentWeekDay) === false
            );
        }

        return staffData;
    };

    return (
        <div className="staff-container">
            <div className="staff-list-div">
                <div>
                    <Typography style={{}} fontSize={30} fontWeight="bold">
                        Hotel Staff
                    </Typography>
                </div>
                <Paper className="staff-header-paper">
                    {headers &&
                        headers.map(({ name, value }) => (
                            <div
                                onClick={() => setSelectedHeader(value)}
                                key={`${name}-${value}`}
                                className={`roomHeader ${
                                    selectedHeader === value ? "header-selected" : null
                                }`}
                            >
                                <Typography variant="h6">{name}</Typography>
                            </div>
                        ))}
                </Paper>

                {/* {user.role === "ADMIN" ? ( */}
                {localStorage.getItem("role") === "ADMIN" ? (
                    <Button onClick={() => setOpenModal(true)} variant="contained">
                        Create Staff
                    </Button>
                ) : null}
            </div>

            <TableContainer component={Paper} elevation={0} className="staff-table-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            {tableheader.map((name) => (
                                <StyledTableCell key={name}>
                                    {name.toLocaleUpperCase()}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterEmployees() &&
                            filterEmployees().map(
                                ({
                                    lastName,
                                    firstName,
                                    jobTitle,
                                    jobDescription,
                                    workingDays,
                                    // time,
                                    // status,
                                    contact,
                                    salary,
                                    employeeID,
                                }: StaffDetailsType) => {
                                    const status =
                                        workingDays &&
                                        workingDays.includes(
                                            new Date().toLocaleDateString("en-us", {
                                                weekday: "long",
                                            })
                                        );
                                    return (
                                        <StyledTableRow
                                            hover
                                            key={`${lastName} ${firstName}-${jobTitle}-${contact}`}
                                        >
                                            <TableCell>{`${lastName} ${firstName}`}</TableCell>
                                            <TableCell>
                                                <Typography>{jobTitle}</Typography>
                                                {/* <Typography variant="caption">
                                                    {jobDescription}
                                                </Typography> */}
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {workingDays && workingDays.join(", ")}
                                                </Typography>
                                                {/* <Typography variant="caption">{time}</Typography> */}
                                            </TableCell>
                                            <TableCell>{contact}</TableCell>
                                            <TableCell>
                                                <Typography
                                                    className={`generic-status ${
                                                        status ? "active" : "inactive"
                                                    }`}
                                                >
                                                    {/* <Typography className={status.toLocaleLowerCase()}> */}
                                                    {workingDays &&
                                                    workingDays.includes(
                                                        new Date().toLocaleDateString("en-us", {
                                                            weekday: "long",
                                                        })
                                                    )
                                                        ? "Active"
                                                        : "Inactive"}
                                                </Typography>
                                            </TableCell>
                                            {/* <TableCell>{salary}</TableCell> */}
                                            <TableCell
                                                style={{ display: "flex", flexDirection: "row" }}
                                            >
                                                <Tooltip title="Edit staff details">
                                                    <IconButton
                                                        onClick={() => {
                                                            setEditModal((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    openEditModal: true,
                                                                    selectedStaffID: employeeID,
                                                                };
                                                            });
                                                        }}
                                                        color="primary"
                                                    >
                                                        <EditRounded />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Delete staff">
                                                    <IconButton color="error">
                                                        <DeleteRounded />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </StyledTableRow>
                                    );
                                }
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateStaffModal open={openModal} setOpenModal={setOpenModal} />
            <EditStaffDetails
                open={editModal.openEditModal}
                setOpenModal={setEditModal}
                // staffDetailsID={
                //     staffData.filter((s) => s.employeeID === editModal.selectedStaffID)[0]
                // }
                staffDetailsID={editModal.selectedStaffID}
            />
        </div>
    );
}

export default Staff;
// return employeeData.filter(({ status }: { status: string }) => status.toLocaleLowerCase() === "inactive");
