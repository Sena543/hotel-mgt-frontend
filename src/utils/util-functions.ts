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

export function filterMenuItems(data: any, dishType: string, menuType: string) {
	return data.filter(
		(item: any) => item.dishType.toLowerCase() === dishType && item.menuType.toLowerCase() === menuType
	);
}
