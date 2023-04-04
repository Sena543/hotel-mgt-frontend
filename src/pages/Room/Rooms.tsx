import { Container } from "@mui/material";
import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import firestoredb from "../../../firebase-config";
import RoomHeader from "../../components/Room/RoomHeader";
import RoomList from "../../components/Room/RoomList";
import "./room.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/types";
import { fetchAllRooms } from "../../redux/slices/roomSlicers";

type RoomType = {
	roomName: string;
	bedType: string;
	facility: string;
	status: string;
	// status: "Booked" | "Available";
	[key: string]: any;
	// key?: string | null;
};

function Rooms() {
	const [selectedHeader, setSelectedHeader] = useState<string>("all");
	const roomListData = useSelector((state: any) => state.rooms.roomList);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchAllRooms());
	}, []);
	return (
		<Container className="room-container">
			<RoomHeader selectedHeader={selectedHeader} setSelectedHeader={setSelectedHeader} />
			<RoomList roomData={roomListData} selectedHeader={selectedHeader} />
		</Container>
	);
}

export default Rooms;
