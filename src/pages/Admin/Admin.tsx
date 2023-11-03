import { Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import AdminTable from "../../components/Admin/AdminTable";
import CreateNewUser from "../../components/Admin/CreateNewUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/types";
import { fetchAllUsers } from "../../redux/slices/staffSlices";

function Admin() {
    const users = useSelector((state: any) => state.staff.users);
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchAllUsers());
        }
    }, [dispatch, users]);

    return (
        <div className="restaurant-container">
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
            <AdminTable tableData={users} />
            <CreateNewUser open={openModal} setOpenModal={setOpenModal} />
        </div>
    );
}

export default Admin;
