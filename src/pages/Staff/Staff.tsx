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
} from "@mui/material";
import { useState } from "react";
import "./staff.css";
import { StyledTableCell, StyledTableRow } from "../../components/Table/TableComp";
import { employeeData } from "../../services/employee-data";
import CreateStaffModal from "../../components/staff/CreateStaffModal";

function Staff() {
	const [selectedHeader, setSelectedHeader] = useState<string>("all");
	const [openModal, setOpenModal] = useState(false);

	const headers = [
		{ name: "All Employees", value: "all" },
		{ name: "Active Employees", value: "active" },
		{ name: "Inactive Employees", value: "inactive" },
	];
	const tableheader = ["Employees Name", "Job Description", "Schedule", "Contact", "Status"];

	const filterEmployees = () => {
		const currentWeekDay = new Date().toLocaleDateString("en-us", { weekday: "long" });
		//return which employees are active on the current day
		//useful if shift system is ran
		if (selectedHeader === "active") {
			return employeeData.filter(
				({ schedule }: { schedule: string }) => schedule.split(", ").includes(currentWeekDay) === true
			);
		}
		if (selectedHeader === "inactive") {
			return employeeData.filter(
				({ schedule }: { schedule: string }) => schedule.split(", ").includes(currentWeekDay) === false
			);
		}

		return employeeData;
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
								className={`roomHeader ${selectedHeader === value ? "header-selected" : null}`}
							>
								<Typography variant="h6">{name}</Typography>
							</div>
						))}
				</Paper>
				<Button onClick={() => setOpenModal(true)} variant="contained">
					Create Staff
				</Button>
			</div>

			<TableContainer component={Paper} elevation={0} className="staff-table-container">
				<Table>
					<TableHead>
						<TableRow>
							{tableheader.map((name) => (
								<StyledTableCell key={name}>{name.toLocaleUpperCase()}</StyledTableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{filterEmployees() &&
							filterEmployees().map(
								({
									name,
									jobTitle,
									description,
									schedule,
									time,
									// status,
									contact,
								}: {
									name: string;
									jobTitle: string;
									description: string;
									schedule: string;
									time: string;
									// status: string;
									contact: string;
								}) => {
									const status = schedule
										.split(", ")
										.includes(new Date().toLocaleDateString("en-us", { weekday: "long" }));
									return (
										<StyledTableRow hover key={`${name}-${jobTitle}-${contact}`}>
											<TableCell>{name}</TableCell>
											<TableCell>
												<Typography>{jobTitle}</Typography>
												<Typography variant="caption">{description}</Typography>
											</TableCell>
											<TableCell>
												<Typography>{schedule}</Typography>
												<Typography variant="caption">{time}</Typography>
											</TableCell>
											<TableCell>{contact}</TableCell>
											<TableCell>
												<Typography
													className={`generic-status ${status ? "active" : "inactive"}`}
												>
													{/* <Typography className={status.toLocaleLowerCase()}> */}
													{schedule
														.split(", ")
														.includes(
															new Date().toLocaleDateString("en-us", { weekday: "long" })
														)
														? "Active"
														: "Inactive"}
												</Typography>
											</TableCell>
										</StyledTableRow>
									);
								}
							)}
					</TableBody>
				</Table>
			</TableContainer>
			<CreateStaffModal open={openModal} setOpenModal={setOpenModal} />
		</div>
	);
}

export default Staff;
// return employeeData.filter(({ status }: { status: string }) => status.toLocaleLowerCase() === "inactive");
