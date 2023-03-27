import { Typography, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import CreateGuestModal from "../../components/guest/CreateGuestModal";
import GuestTable from "../../components/guest/GuestTable";
import "./guests.css";
import firestoredb from "../../../firebase-config";
import { collection, getDocs, serverTimestamp } from "firebase/firestore/lite";
import * as dayjs from "dayjs";

type GuestsType = {
	lastName: string;
	firstName: string;
	roomID: string;
	checkIn: string | any;
	checkOut: string | any;
	specialRequests: string;
	status: string;
};
function Guests() {
	const theme = useTheme();
	const [openModal, setOpenModal] = useState(false);
	const [guests, setGuests] = useState<GuestsType[] | []>([]);

	const guestCollectionRef = collection(firestoredb, "guests");
	useEffect(() => {
		const getGuest = async () => {
			const data = await getDocs(guestCollectionRef);

			setGuests(
				data.docs.map((doc) => ({
					...doc.data(),
					checkIn: new Date(dayjs.unix(doc.data().checkIn["seconds"]).toISOString()).toLocaleDateString(
						"en-GB",
						{ timeZone: "UTC" }
					),
					checkOut: new Date(dayjs.unix(doc.data().checkOut["seconds"]).toISOString()).toLocaleDateString(
						"en-GB",
						{
							timeZone: "utc",
						}
					),
				}))
			);
		};
		getGuest();
	}, []);
	console.log(guests);
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

			<GuestTable guestList={guests} />
			<CreateGuestModal open={openModal} setOpenModal={setOpenModal} />
		</div>
	);
}

export default Guests;
