import "./guest-details.css";
import GenericDashCards from "../../../components/Cards/GenericDashCards";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import GuestProfile from "./GuestProfile";
import CurrentBooking from "./CurrentBooking";
import { StyledTableCell, StyledTableRow } from "../../../components/Table/TableComp";
import { roomData } from "../../../services/roomList";
import { Link, useParams } from "react-router-dom";

function GuestDetails() {
	const { name } = useParams();
	const tableHeadList = ["Room Name", "Bed Type", "Room Facility", "Book Date"];
	return (
		<div className="guest-details-container">
			<div className="booking-history-div">
				<Typography style={{ marginRight: "5px" }} fontSize={30} fontWeight="bold">
					Guest Details{" "}
				</Typography>
			</div>
			<div style={{ display: "flex", flexDirection: "row", marginBottom: "25px" }}>
				<Link to={"/guests"} style={{ textDecoration: "none" }}>
					<Typography style={{ marginRight: "3px" }}>Guest / </Typography>
				</Link>
				<Typography>{name}</Typography>
			</div>
			<div className="guest-details-booking">
				<div className="current-booking-card">
					<GenericDashCards>
						<CurrentBooking />
					</GenericDashCards>
				</div>
				<div className="guest-profile-card">
					<GenericDashCards>
						<GuestProfile />
					</GenericDashCards>
				</div>

				<div className="booking-history-title grid-col-span-3">
					{/* <div className="date-report-div">
						<div>Date filter</div>
						<div>Generate Report</div>
					</div> */}
				</div>
				<div className="guest-booking-history-card grid-col-span-3">
					<GenericDashCards>
						<div className="booking-history-div">
							<Typography fontWeight="bold" fontSize="20px">
								Booking History
							</Typography>
						</div>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										{tableHeadList.map((name) => (
											<StyledTableCell>{name.toLocaleUpperCase()}</StyledTableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{roomData.map(
										({
											roomName,
											bedType,
											facility,
											status,
											period,
										}: {
											roomName: string;
											bedType: string;
											facility: string;
											status: string;
											period: string;
										}) => (
											<StyledTableRow hover>
												<TableCell>{roomName}</TableCell>
												<TableCell>{bedType}</TableCell>
												<TableCell>{facility}</TableCell>
												<TableCell>
													<Typography
														className={status.toLocaleLowerCase()}
														style={{
															display: "grid",
															placeItems: "center",
															width: "70%",
															borderRadius: 5,
														}}
													>
														{status}
													</Typography>
													<Typography variant="caption" display="block">
														{period}
													</Typography>
												</TableCell>
											</StyledTableRow>
										)
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</GenericDashCards>
				</div>
			</div>
		</div>
	);
}

export default GuestDetails;
