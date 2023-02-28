import { CloseRounded, MoreVertRounded } from "@mui/icons-material";
import { Modal, Box, Typography, Divider, IconButton, Tooltip } from "@mui/material";
import React from "react";
import Review from "./Review";
import ReviewComponent from "./Review/ReviewComponent";
import "./styles/reviewmodal.css";

type ReviewModalProps = {
	open: boolean;
	setOpenModal: Function;
};

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 1000,
	height: "85%",
	// maxHeight: "80%",
	bgcolor: "background.paper",
	border: "1px solid #000",
	boxShadow: 24,
	p: 4,
	overflowY: "auto",
};

function ReviewModal({ open, setOpenModal }: ReviewModalProps) {
	return (
		<Modal
			className="modal"
			open={open}
			onClose={() => setOpenModal(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<div className="guest-review-header generic-flex-justify-content-style">
					<Typography fontWeight={"bolder"} fontSize="25px">
						Guest Reviews
					</Typography>
					<Tooltip title="Close Reviews">
						<IconButton onClick={() => setOpenModal(false)}>
							<CloseRounded />
						</IconButton>
					</Tooltip>
				</div>
				<Divider />
				<ReviewComponent />
				<Divider />
				<ReviewComponent />
				<Divider />
				<ReviewComponent />
				<Divider />
				<ReviewComponent />
				<Divider />
				<ReviewComponent />
				<Divider />
				<ReviewComponent />
				<Divider />
				<ReviewComponent />
				<Divider />
			</Box>
		</Modal>
	);
}

export default ReviewModal;
