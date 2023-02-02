import GenericDashCards from "../Cards/GenericDashCards";
import { ResponsiveStream } from "@nivo/stream";
import { lineGraphData } from "../../services/lineGraphData";

function ReservationStat() {
	return (
		<GenericDashCards>
			<div style={{ width: "100%", height: "96%", display: "flex" }}>
				<ResponsiveStream
					data={lineGraphData}
					keys={["Check in", "Check out"]}
					margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
					axisTop={null}
					axisRight={null}
					enableGridX={true}
					enableGridY={false}
					fillOpacity={0.85}
				/>
			</div>
		</GenericDashCards>
	);
}

export default ReservationStat;
