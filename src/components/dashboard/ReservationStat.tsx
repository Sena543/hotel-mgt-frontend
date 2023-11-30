import GenericDashCards from "../Cards/GenericDashCards";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { lineGraphData } from "../../services/lineGraphData";
import { Typography, useTheme } from "@mui/material";
import "./styles/reservation-stat.css";
import { GuestsType } from "../../constants/genericTypes";
import { groupByMonthAndCount } from "../../utils/util-functions";

const PURPLE_LINE_GRAPH_COLOR = "#80529d";
const YELLOW_LINE_GRAPH_COLOR = "#f6ae44";
function ReservationStat({
    guestData,
    checkIn,
    checkOut,
}: {
    guestData: GuestsType[];
    checkIn: number;
    checkOut: number;
}) {
    const theme = useTheme();

    return (
        <GenericDashCards>
            <div className="reservation-stat-container">
                <div className="reserve-stat-div">
                    <Typography fontWeight={"bold"}>Reservation Statistics</Typography>
                </div>{" "}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "50%",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography fontWeight="bold" fontSize={20} style={{ marginRight: "5px" }}>
                            {checkIn.toString()}
                        </Typography>
                        <Typography style={{ color: "gray", fontSize: "13px" }}>
                            Check in
                        </Typography>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography fontWeight="bold" fontSize={20} style={{ marginRight: "5px" }}>
                            {checkOut.toString()}
                        </Typography>
                        <Typography style={{ color: "gray", fontSize: "13px" }}>
                            Check out
                        </Typography>
                    </div>
                </div>
            </div>
            <div style={{ width: "99%", height: "99%", display: "flex" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={930}
                        height={400}
                        data={groupByMonthAndCount(guestData)}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={PURPLE_LINE_GRAPH_COLOR}
                                    stopOpacity={0.6}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={PURPLE_LINE_GRAPH_COLOR}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={YELLOW_LINE_GRAPH_COLOR}
                                    stopOpacity={0.6}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={YELLOW_LINE_GRAPH_COLOR}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="checkIn"
                            stroke={PURPLE_LINE_GRAPH_COLOR}
                            fillOpacity={1}
                            fill="url(#colorUv)"
                        />
                        <Area
                            type="monotone"
                            dataKey="checkOut"
                            stroke={YELLOW_LINE_GRAPH_COLOR}
                            fillOpacity={1}
                            fill="url(#colorPv)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </GenericDashCards>
    );
}

export default ReservationStat;
