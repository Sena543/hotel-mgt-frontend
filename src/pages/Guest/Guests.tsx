import { Typography, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import CreateGuestModal from "../../components/guest/CreateGuestModal";
import GuestTable from "../../components/guest/GuestTable";
import "./guests.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuests } from "../../redux/slices/guestSlices";
import { AppDispatch } from "../../redux/types";

type GuestsType = {
	lastName: string;
	firstName: string;
	roomAssigned: string;
	checkIn: string | any;
	checkOut: string | any;
	specialRequests: string;
	status: string;
};
function Guests() {
	const theme = useTheme();
	const dispatch = useDispatch<AppDispatch>();
	const guestsList = useSelector((state: any) => state.guests.guestsData);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		// const getGuest = async () => {
		// 	let returnedData: any = [];
		// 	const data = await getDocs(guestCollectionRef);
		// 	data.docs.map((doc) => {
		// 		// console.log(doc.data()["checkIn"]);
		// 		returnedData.push({
		// 			...doc.data(),
		// 		});
		// 	});
		// 	// console.log(returnedData);
		// 	setGuests(returnedData);
		// };
		// getGuest();
		dispatch(fetchGuests());
	}, [dispatch]);

	return (
		<div className="guest-container">
			<div className="guest-title">
				<Typography style={{}} fontSize={30} fontWeight="bold">
					Guest List
				</Typography>

				<Button
					variant="contained"
					onClick={() => setOpenModal(true)}
					// style={{ color: theme?.palette.primary.main }}
				>
					Create Guest
				</Button>
			</div>

			<GuestTable guestList={guestsList} />
			{/* <GuestTable guestList={guests} /> */}
			<CreateGuestModal open={openModal} setOpenModal={setOpenModal} />
		</div>
	);
}

export default Guests;
