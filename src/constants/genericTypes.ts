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
};

export type StaffDetailsType = {
    lastName: string;
    firstName: string;
    email: string;
    contact: string;
    jobDescription: string;
    jobTitle: string;
    workingDays: string[];
    employeeID: string;
};

export type MenuItemType = {
    rawDocID?: string;
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
    mealOrderID?: MenuItemType[];
    rawDocID?: string;
};

export type TaxInformation = {
    rawDocID?: string;
    name: string;
    value: number;
};
