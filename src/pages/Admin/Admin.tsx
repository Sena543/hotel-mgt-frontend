import { Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminTable from "../../components/Admin/AdminTable";
import CreateNewUser from "../../components/Admin/CreateNewUser";

function Admin() {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            <div className="restaurant-header">
                <Typography style={{}} fontSize={30} fontWeight="bold">
                    Administrator Panel
                </Typography>

                <div className="header-button-div">
                    {/* <Link className="menu-link" to={"/restaurant/menu"}>
						<Button>View Menu</Button>
					</Link> */}
                    <Button onClick={() => setOpenModal(true)}>Create New User</Button>
                </div>
            </div>
            <AdminTable />
            {/* <CreateNewUser open={openModal} setOpenModal={setOpenModal} /> */}
            <CreateNewUser open={openModal} setOpenModal={setOpenModal} />
        </div>
    );
}

export default Admin;
