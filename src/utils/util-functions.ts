import { QuerySnapshot, DocumentData } from "firebase/firestore/lite";
import { GuestsType } from "../constants/genericTypes";
import months from "../services/months";
import dayjs from "dayjs";

export const getRawData = (returnedDBData: QuerySnapshot<DocumentData>) => {
    const rawData: any = [];
    returnedDBData.docs.map((doc: any) => {
        rawData.push({
            ...doc.data(),
            rawDocID: doc.id,
        });
    });
    return rawData;
};

export function filterMenuItems(data: any, dishType: string, menuType: string) {
    return data.filter(
        (item: any) =>
            item.dishType.toLowerCase() === dishType && item.menuType.toLowerCase() === menuType
    );
}

export function groupAndCount(
    // <
    //     T extends {
    //         name: string;
    //         checkIn: number;
    //         checkOut: number;
    //     }
    // >
    guests: GuestsType[]
) {
    let grouped: {
        name: string;
        checkIn: number;
        checkOut: number;
    }[] = [];

    guests.forEach((guest: GuestsType) => {
        let monthObj = {
            name: "",
            checkIn: 0,
            checkOut: 0,
        };
        const monthNumber: Number = guest["checkOut"].split("-")[0];
        //add spaces to check in and check out so they render properly
        monthObj["checkIn"] = dayjs().isSameOrAfter(guest.checkIn)
            ? monthObj.checkIn + 1
            : monthObj.checkIn;
        monthObj["checkOut"] = dayjs().isSameOrAfter(guest.checkOut)
            ? monthObj.checkOut + 1
            : monthObj.checkOut;
        monthObj["name"] = months[Number(monthNumber) - 1];

        grouped.push(monthObj);
    });
    return grouped.sort((a, b) => {
        return new Date(b.checkOut).getTime() - new Date(a.checkOut).getTime();
    });
}
