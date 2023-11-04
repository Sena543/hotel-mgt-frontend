import { QuerySnapshot, DocumentData } from "firebase/firestore/lite";
import { GuestsType } from "../constants/genericTypes";
import months from "../services/months";
import dayjs from "dayjs";
import { storageBucket } from "../../firebase-config";
import { StorageReference, ref } from "firebase/storage";
// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

export const getRawData = <T>(returnedDBData: QuerySnapshot<DocumentData>): T[] => {
	const rawData: T[] = [];
	returnedDBData.docs.map((doc: any) => {
		rawData.push({
			...doc.data(),
			rawDocID: doc.id,
		});
	});
	return rawData;
};

// export const creatUploadRef = (uploadDir: string, imageUpload: File): StorageReference => {
export const createUploadRef = (uploadDir: string, imageName: string): StorageReference => {
	// const imagesRef = ref(storageBucket, `${uploadDir}/${imageUpload.name}`);
	return ref(storageBucket, `${uploadDir}/${imageName}-${Date.now()}`);
};

export function filterMenuItems(data: any, dishType: string, menuType: string) {
	return data.filter(
		(item: any) => item.dishType.toLowerCase() === dishType && item.menuType.toLowerCase() === menuType
	);
}

export function groupByMonthAndCount(guests: GuestsType[]) {
	const groupAndCount = Array.from(months, (month) => {
		return { name: month, checkIn: 0, checkOut: 0 };
	});

	guests.forEach((guest: GuestsType) => {
		const checkInmonthNumber = Number(guest["checkIn"].split("-")[0]) - 1;
		const checkOutmonthNumber = Number(guest["checkOut"].split("-")[0]) - 1;

		groupAndCount[checkInmonthNumber].checkIn = dayjs().isSameOrAfter(guest.checkIn)
			? groupAndCount[checkInmonthNumber].checkIn + 1
			: groupAndCount[checkInmonthNumber].checkIn;

		groupAndCount[checkOutmonthNumber].checkOut = dayjs().isSameOrAfter(guest.checkOut)
			? groupAndCount[checkOutmonthNumber].checkOut + 1
			: groupAndCount[checkOutmonthNumber].checkOut;
	});

	return groupAndCount.slice(0, new Date().getMonth() + 1);
}

export function checkGuestStatus(date: string) {
	return dayjs().isAfter(dayjs(date));
}
//todo
//filter rooms that have been checked into
//months still not rendering properly

//possible solutions
/**
 * use month number to index months array and use results on the grouped and count array
 * use month number directly on the groupedAndCount array
 */
