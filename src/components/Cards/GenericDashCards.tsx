import "./card.css";
type GenericDashCardsProps = {
	children: any;
};

function GenericDashCards({ children }: GenericDashCardsProps) {
	return <div className="generic-card-container">{children}</div>;
}

export default GenericDashCards;
