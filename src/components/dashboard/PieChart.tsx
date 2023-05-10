import { pieData } from "../../services/pieData";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import GenericDashCards from "../Cards/GenericDashCards";
import { useState } from "react";
import { PURPLE_LINE_GRAPH_COLOR, YELLOW_LINE_GRAPH_COLOR } from "../../constants/colours";
import { Typography } from "@mui/material";

const RADIAN = Math.PI / 180;
// const COLORS = [PURPLE_LINE_GRAPH_COLOR, "#FFF"];
const COLORS = [PURPLE_LINE_GRAPH_COLOR, YELLOW_LINE_GRAPH_COLOR];

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

type PreparedData = {
    id: string;
    label: string;
    value: number;
    color: string;
};

function DashPieChart({ pieChartData }: { pieChartData: PreparedData[] }) {
    const [activeIndex, setAcitiveIndex] = useState(0);

    const result = pieChartData.reduce((acc: any, curr: any) => {
        const index = acc.findIndex((item: any) => item.label === curr.label);
        index > -1
            ? (acc[index].value += curr.value)
            : acc.push({
                  value: curr.value,
                  id: curr.label,
                  label: curr.label,
                  color: "hsl(270, 70%, 50%)",
              });
        return acc;
    }, []);

    return (
        <GenericDashCards>
            <PieChart width={250} height={200}>
                <Pie
                    // activeIndex={activeIndex}
                    data={result}
                    // data={pieData}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={40}
                    outerRadius={60}
                    fill="rgb(80, 164, 212)"
                    labelLine={false}
                    // label={renderCustomizedLabel}
                    // onMouseEnter={(_, index) => setAcitiveIndex(index)}
                >
                    {result.map((entry: any, index: any) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
            <div>
                {/* <Typography>1234</Typography> */}
                <Typography>Check in and Check outs Today</Typography>
            </div>
        </GenericDashCards>
    );
}

export default DashPieChart;
