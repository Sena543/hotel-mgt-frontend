import { CloseRounded } from "@mui/icons-material";
import { Modal, Backdrop, Fade, Box, Typography, Divider, IconButton } from "@mui/material";
import React from "react";

type GuestRequestProps = { request: string; open: boolean; setOpen: Function };

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function GuestRequest({ request, open, setOpen }: GuestRequestProps) {
	const handleClose = () => setOpen(false);
	return (
		<div
			style={{
				borderRadius: 25,
			}}
		>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								// background: "red",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography variant="h5">Guest Special Requests</Typography>
							<IconButton onClick={handleClose}>
								<CloseRounded />
							</IconButton>
						</div>
						<Divider />
						<Typography id="transition-modal-title" variant="h6">
							{request}
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

export default GuestRequest;
