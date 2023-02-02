import { Typography } from "@mui/material";
import "./glance.css";

type GlanceCardsProps = {
	number: number;
	name: string;
	icon: JSX.Element;
	backgColor: string;
};

export const GlanceCards = ({ number, name, icon, backgColor }: GlanceCardsProps) => {
	return (
		<div className="glance-container" style={{ backgroundColor: backgColor }}>
			<div>
				<Typography variant="h5">{number}</Typography>
				<Typography variant="caption">{name}</Typography>
			</div>
			<div>{icon}</div>
		</div>
	);
};
