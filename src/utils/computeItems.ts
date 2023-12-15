import dayjs from "dayjs";
import { RoomType } from "../components/Room/RoomList";
import {
    BookingHistoryType,
    GuestsType,
    MenuItemType,
    TaxInformation,
} from "../constants/genericTypes";
import { formattedDate } from "./util-functions";

export function formatForTable(guestRoomStayed: RoomType[]) {
    const arr: Array<{ roomNo: string; des: string; pricePerNight: number; otherCharges: number }> =
        [];
    guestRoomStayed.forEach((room) => {
        let data = {
            roomNo: "",
            des: "",
            pricePerNight: 0,
            otherCharges: 0,
        };
        data.roomNo = room.roomName;
        data.des = room.facility;
        data.pricePerNight = room.price;

        arr.push(data);
    });
    return arr;
}

export function otherCharges(
    guestBookingDetails: BookingHistoryType,
    restaurantMeals: MenuItemType[]
) {
    const guestMeals = guestBookingDetails?.mealOrderID;
    type Format = {
        type: string;
        name: string;
        price: number;
    };

    const otherChargeFormatted: Format[] = [];

    guestMeals &&
        guestMeals.forEach((meal) => {
            const beverageObj = {} as Format;
            const mealObj = {} as Format;
            if (meal.beverageId) {
                beverageObj["type"] = "Beverage";
                beverageObj["price"] = meal?.beveragePrice;

                const getBev = restaurantMeals.filter((m) => m.dishId === meal.beverageId)[0];
                beverageObj["name"] = getBev?.dishOrBev;
                otherChargeFormatted.push(beverageObj);
            }
            if (meal.mealId) {
                mealObj["type"] = "Meal";
                const getMeal = restaurantMeals.filter((m) => m.dishId === meal.mealId)[0];
                mealObj["price"] = meal.mealPrice;
                mealObj["name"] = getMeal?.dishOrBev;

                otherChargeFormatted.push(mealObj);
            }
        });

    return otherChargeFormatted;
}

export function otherChargesSum(
    guestBookingDetails: BookingHistoryType,
    restaurantMeals: MenuItemType[]
) {
    return otherCharges(guestBookingDetails, restaurantMeals).reduce((currentSum, currentValue) => {
        return currentSum + currentValue.price;
    }, 0);
}

export function computeTax(tax: number, value: number) {
    return tax * value;
}

export function computeOverallTaxAmount(taxes: TaxInformation[], itemTotal: number) {
    let vals: number[] = [];
    taxes.forEach((t) => {
        vals.push(t.value * itemTotal);
    });
    // return taxes.reduce(
    //     (currentSum, currValue) => computeTax(currValue.value, itemTotal) + currentSum,
    //     0
    // );

    return vals.reduce((currSum: number, curValue: number) => curValue + currSum, 0);
}

export function computeOverallSum(taxes: TaxInformation[], itemTotal: number) {
    let vals: number[] = [];
    taxes.forEach((t) => {
        vals.push(t.value * itemTotal);
    });

    return vals.reduce((currSum: number, curValue: number) => curValue + currSum, itemTotal);
}

export function processVariousData(
    guestRoomStayed: RoomType[],
    guestBookingDetails: BookingHistoryType,
    restaurantMeals: MenuItemType[],
    taxes: TaxInformation[],
    guestDetails: GuestsType
) {
    const processedTableData = formatForTable(guestRoomStayed);
    const otherChargesProcessed = otherCharges(guestBookingDetails, restaurantMeals);

    const otherChargesSumOutput = otherChargesSum(guestBookingDetails, restaurantMeals);

    const subSum = processedTableData.reduce(
        (currSum, row) =>
            currSum +
            row.pricePerNight *
                Number(
                    dayjs(formattedDate(guestDetails.checkOut)).diff(
                        formattedDate(guestDetails.checkIn),
                        "day"
                    )
                ),
        0
    );
    const overallAmount = computeOverallSum(taxes, otherChargesSumOutput + subSum).toFixed(2);
    const taxAmount = computeOverallTaxAmount(taxes, subSum).toFixed(2);
    console.log(taxAmount);
    return {
        processedTableData,
        otherChargesProcessed,
        otherChargesSumOutput,
        overallAmount,
        subSum,
        taxAmount,
    };
}
