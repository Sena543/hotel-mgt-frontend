import GenericDashCards from "../Cards/GenericDashCards";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { lineGraphData } from "../../services/lineGraphData";
import { Typography } from "@mui/material";
import "./styles/reservation-stat.css";
function ReservationStat() {
	return (
		<GenericDashCards>
			<div className="reservation-stat-container">
				<Typography fontWeight={"light"}>Reservation Statistics</Typography>
				<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "40%" }}>
					<div
						style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "20%" }}
					>
						<Typography>123</Typography>
						<Typography>Check in</Typography>
					</div>
					<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
						<Typography>22</Typography>
						<Typography>Check out</Typography>
					</div>
				</div>
			</div>
			<div style={{ width: "100%", height: "96%", display: "flex" }}>
				<AreaChart
					width={940}
					height={400}
					data={lineGraphData}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}
				>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
						<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey="name" />
					<YAxis />
					{/* <CartesianGrid strokeDasharray="3 3" /> */}
					<Tooltip />
					<Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
					<Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
				</AreaChart>
			</div>
		</GenericDashCards>
	);
}

export default ReservationStat;
