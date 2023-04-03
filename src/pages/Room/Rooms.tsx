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
	const [rooms, setRooms] = useState<RoomType[] | []>([]);
	const useRoomCollectionRef = collection(firestoredb, "rooms");
	const roomListData = useSelector((state: any) => state.rooms.roomListData);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		async function getAllRooms() {
			let returnedData: any = [];
			const room_Data = await getDocs(useRoomCollectionRef);
			room_Data.docs.forEach((doc) => returnedData.push({ ...doc.data() }));
			// room_Data.docs.forEach((doc) => returnedData.push({ ...doc.data() }));
			// room_Data.docs.forEach((doc) => console.log(doc.data()));
			// setRooms(room_Data.docs.map((doc) => ({ ...doc.data() })));
			// console.log(returnedData);
			setRooms(returnedData);
		}
		getAllRooms();
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
