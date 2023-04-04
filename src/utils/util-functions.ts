import { QuerySnapshot, DocumentData } from "firebase/firestore/lite";

export const getRawData = (returnedDBData: QuerySnapshot<DocumentData>) => {
	const rawData: any = [];
	returnedDBData.docs.map((doc: any) => {
		rawData.push({
			...doc.data(),
		});
	});
	return rawData;
};
