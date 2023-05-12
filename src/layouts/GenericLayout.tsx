import React from "react";
import { Outlet } from "react-router-dom";

function GenericLayout() {
	return (
		<div>

			<Outlet />
		</div>
	);
}

export default GenericLayout;
