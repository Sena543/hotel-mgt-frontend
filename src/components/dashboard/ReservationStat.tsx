import GenericDashCards from "../Cards/GenericDashCards";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { lineGraphData } from "../../services/lineGraphData";

function ReservationStat() {
	return (
		<GenericDashCards>
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
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
				</AreaChart>
			</div>
		</GenericDashCards>
	);
}

export default ReservationStat;
