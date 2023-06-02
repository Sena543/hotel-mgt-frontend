import "./dash.css";
import {
    BookmarkBorderRounded,
    LogoutRounded,
    LoginRounded,
    CalendarMonthRounded,
} from "@mui/icons-material";
import Calendar from "react-calendar";

import { GlanceCards } from "../../components/dashboard/GlanceCards";
import AvailableRooms from "../../components/dashboard/AvailableRooms";
import ReservationStat from "../../components/dashboard/ReservationStat";
import Review from "../../components/dashboard/Review";
import DashboardCalendar from "../../components/dashboard/Calendar";
import DashPieChart from "../../components/dashboard/PieChart";
import GenericDashCards from "../../components/Cards/GenericDashCards";
import GenericHeader from "../../components/Header/GenericHeader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/types";
import { GuestStateType, fetchGuests } from "../../redux/slices/guestSlices";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { GuestsType } from "../../constants/genericTypes";

dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type BookingCountType<T extends "newBooking" | "scheduled" | "checkIn" | "checkOut"> = {
    [K in T]: GuestsType[];
};
type PreparedData = {
    id: string;
    label: string;
    value: number;
    color: string;
};
// const prepareData = (guestData: GuestsType[]) => {
//     let prepedData: PreparedData[] = [];
//     guestData.map(({ checkOut }: GuestsType) => {
//         let pieDateObj = { id: "", label: "", value: 0, color: "hsl(270, 70%, 50%)" };
//         if (dayjs().isSameOrBefore(checkOut)) {
//             pieDateObj["id"] = "Checked In";
//             pieDateObj["label"] = "Checked In";
//             pieDateObj["value"] = 1;
//         } else {
//             pieDateObj["id"] = "Checked Out";
//             pieDateObj["label"] = "Checked Out";
//             pieDateObj["value"] = 1;
//         }
//         prepedData.push(pieDateObj);
//     });

//     console.log(prepedData);
//     return prepareData;
// };
const updateBookingCount = (guestsData: GuestsType[]) => {
    let newBooking: GuestsType[] = [];
    let scheduled: GuestsType[] = [];
    let checkIn: GuestsType[] = [];
    let checkOut: GuestsType[] = [];

    guestsData.map((guest: any) => {
        if (dayjs(guest.checkIn).isToday()) {
            checkIn.push(guest);
        }
        if (dayjs().isSameOrAfter(guest.checkOut)) {
            checkOut.push(guest);
        }
    });
    return { newBooking, checkIn, checkOut, scheduled };
};
function Dashboard() {
    const { guestsData } = useSelector((state: RootState): GuestStateType => state.guests);
    const dispatch = useDispatch<AppDispatch>();
    const [bookingCount, setbookingCount] = useState<
        BookingCountType<"newBooking" | "scheduled" | "checkIn" | "checkOut">
    >({
        newBooking: [],
        scheduled: [],
        checkIn: [],
        checkOut: [],
    });

    useEffect(() => {
        if (guestsData.length === 0) dispatch(fetchGuests());

        setbookingCount((prevState: typeof bookingCount) => ({
            ...prevState,
            ...updateBookingCount(guestsData),
        }));
        // console.log(bookingCount);
    }, [dispatch, guestsData]);

    const glanceData = [
        {
            name: "New Booking",
            number: bookingCount.checkIn.length,
            icon: <BookmarkBorderRounded fontSize="large" />,
            backgColor: "#c5b5d0",
        },
        {
            name: "Schedule Room",
            number: bookingCount.checkIn.length,
            icon: <CalendarMonthRounded fontSize="large" />,
            backgColor: "#a5ecca",
        },
        {
            name: "Check in",
            number: bookingCount.checkIn.length,
            icon: <LoginRounded fontSize="large" />,
            backgColor: "#f9d4a8",
        },
        {
            name: "Check out",
            number: bookingCount.checkOut.length,
            icon: <LogoutRounded fontSize="large" />,
            backgColor: "#fcddda",
        },
    ];
    const prepareData = (guestDataParam: GuestsType[]) => {
        let prepedData: PreparedData[] = [];
        guestDataParam &&
            guestDataParam.map(({ checkIn, checkOut }: GuestsType) => {
                let pieDateObj = { id: "", label: "", value: 0, color: "hsl(270, 70%, 50%)" };
                if (dayjs(checkIn).isToday()) {
                    // if (dayjs().isSameOrBefore(checkOut)) {
                    pieDateObj["id"] = "Checked In";
                    pieDateObj["label"] = "Checked In";
                    pieDateObj["value"] = pieDateObj.value + 1;
                }
                if (dayjs(checkOut).isToday()) {
                    pieDateObj["id"] = "Checked Out";
                    pieDateObj["label"] = "Checked Out";
                    pieDateObj["value"] = pieDateObj.value + 1;
                }

                // else {
                //     pieDateObj["id"] = "Checked Out";
                //     pieDateObj["label"] = "Checked Out";
                //     pieDateObj["value"] = 1;
                // }
                prepedData.push(pieDateObj);
            });

        return prepedData;
    };

    // console.log(groupAndCount(guestsData));

    return (
        <>
            <GenericHeader headerTitle="Dashboard" />
            <div className="dashboard-container">
                <div className="glance-cards-div">
                    {glanceData.map(({ name, number, icon, backgColor }, index) => (
                        <GlanceCards
                            key={`${name}${backgColor}`}
                            name={name}
                            number={number}
                            icon={icon}
                            backgColor={backgColor}
                        />
                    ))}
                </div>
                <div className="grid-mobile-col-span-2 ">
                    <DashPieChart pieChartData={prepareData(guestsData)} />
                </div>
                <div className="grid-col-span-3_row-span-2 grid-mobile-col-span-2">
                    <ReservationStat guestData={guestsData} />
                </div>
                <div className="grid-mobile-col-span-2">
                    <AvailableRooms />
                </div>
                <div className="grid-col-span-2 grid-row-span-2 grid-mobile-col-span-2">
                    <DashboardCalendar />
                </div>
                {/* <div className="grid-col-span-2"><GenericDashCards>Check in today list</GenericDashCards></div> */}
                <div className="grid-col-span-2  grid-row-span-2">
                    <Review />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
