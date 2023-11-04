import "./guest-details.css";
import GenericDashCards from "../../../components/Cards/GenericDashCards";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import GuestProfile from "./GuestProfile";
import CurrentBooking from "./CurrentBooking";
import { StyledTableCell, StyledTableRow } from "../../../components/Table/TableComp";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/types";
import { useEffect } from "react";
import { fetchGuestBookingHistory } from "../../../redux/slices/bookingSlices";
import { BookingHistoryType } from "../../../constants/genericTypes";
import { RoomType } from "../../../components/Room/RoomList";

// const prepareBookingHistory = (bookingHistory: any, roomData: any) => {
//types were originally any type just in case types start throwing errors
const prepareBookingHistory = (bookingHistory: BookingHistoryType[], roomData: RoomType[]) => {
	// bh = new booking history variable
	let bh: any = [];

	bookingHistory.forEach((historyElement: BookingHistoryType) => {
		roomData.forEach((roomElement: RoomType) => {
			if (roomElement.roomName === historyElement.roomID) {
				bh.push({
					...historyElement,
					bedType: roomElement.bedType,
					facility: roomElement.facility,
					imgUrls: [...roomElement.imageUrls],
				});
			}
		});
	});
	return bh;
};

function dateWithOrdinal(n: number) {
	return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
}

function GuestDetails() {
	const { name, guestID } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchGuestBookingHistory(Number(guestID)));
	}, [dispatch]);

	const { bookingHistory } = useSelector((state: RootState) => state.booking);
	const { roomList: rooms } = useSelector((state: RootState) => state.rooms);

	//TODO write a test for the line below
	const selectedGuestDetails = useSelector(
		//gets the current booking of the guest
		(state: any) => state.guests.guestsData.filter((guest: any) => guest.guestID === Number(guestID))[0]
	);
	const tableHeadList = ["Room Name", "Bed Type", "Room Facility", "Book Date"];

	const preparedBookingHistoryData = prepareBookingHistory(bookingHistory, rooms);

	const dateObjFunction = (passedDate: string) => {
		return new Date(passedDate);
	};

	const monthFormatterFunction = (passedDate: string) => {
		return new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(passedDate));
	};

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
						<CurrentBooking bookingDetails={preparedBookingHistoryData[0]} />
					</GenericDashCards>
				</div>
				<div className="guest-profile-card">
					<GenericDashCards>
						<GuestProfile profileDetails={selectedGuestDetails} />
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
											<StyledTableCell key={name}>{name.toLocaleUpperCase()}</StyledTableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{/* {roomData.map( */}
									{preparedBookingHistoryData.map(
										({
											roomID,
											bedType,
											facility,
											status,
											// period,
											checkIn,
											checkOut,
										}: {
											roomID: string;
											bedType: string;
											facility: string;
											status: string;
											checkIn: string;
											checkOut: string;
										}) => (
											<StyledTableRow hover key={`${roomID}-${bedType}`}>
												<TableCell>{roomID}</TableCell>
												<TableCell>{bedType}</TableCell>
												<TableCell>{facility}</TableCell>
												<TableCell>
													<Typography
														// className={status.toLocaleLowerCase()}
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
														{`
														${monthFormatterFunction(checkIn)} ${dateObjFunction(checkIn).getDate()}${dateWithOrdinal(
															dateObjFunction(checkIn).getDate()
														)} - ${monthFormatterFunction(checkOut)} ${dateObjFunction(
															checkOut
														).getDate()}${dateWithOrdinal(
															dateObjFunction(checkOut).getDate()
														)} 
													`}

														{/* {console.log(checkOut)} */}
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
// TODO
//sort booking history by  created date
// probabily add created date to database
