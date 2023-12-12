export type GuestsType = {
    lastName: string;
    firstName: string;
    roomAssigned: string;
    checkIn: string | any;
    checkOut: string | any;
    specialRequests?: string;
    status?: string;
    email: string;
    contact: string;
    guestID: Number;
    title: string;
};

export type StaffDetailsType = {
    lastName: string;
    firstName: string;
    email: string;
    contact: string;
    jobDescription: string;
    salary?: number;
    jobTitle: string;
    workingDays: string[];
    employeeID: string;
    rawDocID?: string;
};

export type MenuItemType = {
    rawDocID?: string;
    dishId: number;
    menuType: string;
    dishOrBev: string;
    price: string;
    dishType: string;
    description: string;
};

type DBMenuItemType = {
    beverageId: number;
    beveragePrice: number;
    guestID: number;
    guestName: string;
    mealId: number;
    mealPrice: number;
    roomId: string;

    rawDocID?: string;
    dishId: number;
    menuType: string;
    dishOrBev: string;
    price: string;
    dishType: string;
    description: string;
};

export type BookingHistoryType = {
    bookingID: string;
    guestID: Number;
    // guestID: string;
    roomID: string;
    checkIn: string;
    checkOut: string;
    // mealOrderID?: string[];
    mealOrderID: DBMenuItemType[];
    // mealOrderID?: MenuItemType[];
    rawDocID?: string;
    beddingType?: string;
    // beddingType?: "Single" | "Double" | "Tripple" | "Quad" | "None";
    mealPlan?: string;
    // mealPlan?: "Breakfast" | "Half board" | "Full Board" | "Room Only";
};

export type TaxInformation = {
    rawDocID?: string;
    name: string;
    value: number;
};
