import { ReactNode } from "react";
import "./card.css";
type GenericDashCardsProps = {
	children: ReactNode;
	className?: string;
};

function GenericDashCards({ children, className }: GenericDashCardsProps) {
	return <div className={`generic-card-container ${className}`}>{children}</div>;
}

export default GenericDashCards;
