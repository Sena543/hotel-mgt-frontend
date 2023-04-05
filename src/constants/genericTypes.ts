export type GuestsType = {
	lastName: string;
	firstName: string;
	roomAssigned: string;
	checkIn: string | any;
	checkOut: string | any;
	specialRequests: string;
	status?: string;
	email: string;
	contact: string;
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
	menuType: string;
	dishOrBev: string;
	price: string;
	dishType: string;
	description: string;
};
