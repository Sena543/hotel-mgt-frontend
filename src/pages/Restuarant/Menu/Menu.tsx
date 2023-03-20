import "./menu.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Menu() {
	return (
		<div className="menu-container">
			<div className="menu-header">
				<Typography style={{}} fontSize={30} fontWeight="bold">
					Menu
				</Typography>

				<div className="menu-button-div">
					<Link className="menu-link" to={"/restaurant"}>
						<Button>Back</Button>
					</Link>
				</div>
			</div>
			<div>
				<div className="food-header">
					<h2>Breakfast</h2>
				</div>
				<div className="food-list">
					<div className="dish">
						<Typography>CHICKEN TACO</Typography>
						<span className="element-sep"></span>
						<Typography>3.69</Typography>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Menu;
