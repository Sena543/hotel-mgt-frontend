import { CloseRounded } from "@mui/icons-material";
import { Box, Typography, IconButton, Divider, TextField, Tooltip, Modal } from "@mui/material";
import { ReactNode } from "react";

type ModalProps = {
	open: boolean;
	setOpenModal: Function;
	children: ReactNode;
	className?: string;
};

function GenericModal({ className, open, setOpenModal, children }: ModalProps) {
	return (
		<Modal
			// className={className}
			open={open}
			onClose={() => setOpenModal(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box
				className={className}
				// className="modal-box"
			>
				{children}
			</Box>
		</Modal>
	);
}

export default GenericModal;
