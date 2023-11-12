import React from "react";
import "./inventory.css";
import underConstruction from "../../assets/svgs/Under construction-amico.svg";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import InventoryTable from "../../components/Inventory/InventoryTable";
import { useSelector } from "react-redux";

function Inventory() {
	const user = useSelector((state: any) => state.auth.authData);
	return (
		<div className="restaurant-container">
			<div className="restaurant-header">
				<Typography style={{}} fontSize={30} fontWeight="bold">
					Inventory
				</Typography>

				<div className="header-button-div">
					<Link className="menu-link" to={"menu"}>
						{/* <Button>View Menu</Button> */}
					</Link>
					{localStorage.getItem("role") === "ADMIN" ? <Button onClick={() => {}}>Add Item</Button> : null}
				</div>
			</div>
			<InventoryTable />
			{/* <div>
                <img
                    className="constructionImage"
                    src={underConstruction}
                    alt="Under construction image"
                />
                <Typography>This page is under construction. Please, check back later</Typography>
            </div> */}
		</div>
	);
}

export default Inventory;
