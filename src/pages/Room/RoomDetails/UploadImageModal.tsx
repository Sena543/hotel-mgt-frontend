import "./upload.css";
import GenericModal from "../../../components/Modal/GenericModal";
import { CloseRounded } from "@mui/icons-material";
import { Tooltip, Typography, IconButton, Divider, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { RoomType } from "../../../components/Room/RoomList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/types";
import { addRoomImage } from "../../../redux/slices/roomSlicers";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

type ModalProps = {
	open: boolean;
	setModalOpen: Function;
	roomData: RoomType;
};
function UploadImageModal({ roomData, open, setModalOpen }: ModalProps) {
	const dispatch = useDispatch<AppDispatch>();
	const [fileUpload, setFileUpload] = useState<File | null>(null);
	const handleUpload = async () => {
		if (fileUpload) {
			await dispatch(addRoomImage({ file: fileUpload, roomDetails: roomData }));
		}
	};

	return (
		<GenericModal className="upload-modal" open={open} setOpenModal={setModalOpen}>
			<div style={{ padding: "auto 10px" }} className="upload-header">
				<Typography fontWeight={"bolder"} fontSize="25px">
					Upload Image
				</Typography>
				<Tooltip data-testid="close-icon" title="Close">
					<IconButton onClick={() => setModalOpen(false)}>
						<CloseRounded />
					</IconButton>
				</Tooltip>
			</div>
			<Divider />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					height: "70%",
					alignItems: "center",
				}}
			>
				<Button
					component="label"
					// onChange={(e: React.FormEvent<HTMLLabelElement>) => setFileUpload(e.target.files[0])}
					variant="contained"
					startIcon={<CloudUploadIcon />}
				>
					Upload file
					<VisuallyHiddenInput
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							console.log(e.target?.files);
							if (e.target?.files) {
								setFileUpload(e.target?.files[0]);
							}
						}}
						type="file"
					/>
				</Button>
				<Typography>{fileUpload?.name}</Typography>
			</div>
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2%" }}>
				<Button onClick={() => handleUpload()} variant="contained">
					Upload
				</Button>
			</div>
		</GenericModal>
	);
}

export default UploadImageModal;
