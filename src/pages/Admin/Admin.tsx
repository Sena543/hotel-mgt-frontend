import { Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AdminTable from "../../components/Admin/AdminTable";

function Admin() {
	return (
		<div>
			<div className="restaurant-header">
				<Typography style={{}} fontSize={30} fontWeight="bold">
					Administrator Panel
				</Typography>

				{/* <div className="header-button-div">
					<Link className="menu-link" to={"/restaurant/menu"}>
						<Button>View Menu</Button>
					</Link>
					<Button onClick={() => {}}>Add Item</Button>
				</div> */}
			</div>
			<AdminTable />
		</div>
	);
}

export default Admin;
