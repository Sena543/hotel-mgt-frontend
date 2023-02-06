import { pieData } from "../../services/pieData";
import { PieChart, Pie } from "recharts";
import GenericDashCards from "../Cards/GenericDashCards";
import { useState } from "react";

function DashPieChart() {
	const [activeIndex, setAcitiveIndex] = useState(0);
	return (
		<GenericDashCards>
			<PieChart width={230} height={200}>
				<Pie
					activeIndex={activeIndex}
					data={pieData}
					dataKey="value"
					nameKey="name"
					innerRadius={40}
					outerRadius={50}
					fill="rgb(80, 164, 212)"
					label
					onMouseEnter={(_, index) => setAcitiveIndex(index)}
				/>
			</PieChart>
		</GenericDashCards>
	);
}

export default DashPieChart;
