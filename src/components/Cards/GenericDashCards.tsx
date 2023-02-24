import "./card.css";
type GenericDashCardsProps = {
	children: any;
	className?: string;
};

function GenericDashCards({ children, className }: GenericDashCardsProps) {
	return <div className={`generic-card-container ${className}`}>{children}</div>;
}

export default GenericDashCards;
