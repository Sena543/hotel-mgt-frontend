import { Typography, Button, useTheme } from "@mui/material";
import { useState } from "react";
import CreateGuestModal from "../../components/guest/CreateModal";
import GuestTable from "../../components/guest/GuestTable";
import "./guests.css";

function Guests() {
	const theme = useTheme();
	const [openModal, setOpenModal] = useState(false);
	return (
		<div className="guest-container">
			<div className="guest-title">
				<Typography style={{}} fontSize={30} fontWeight="bold">
					Guest List
				</Typography>

				<Button onClick={() => setOpenModal(true)} style={{ color: theme?.palette.primary.main }}>
					Create Guest
				</Button>
			</div>

			<GuestTable />
			<CreateGuestModal open={openModal} setOpenModal={setOpenModal} />
		</div>
	);
}

export default Guests;
