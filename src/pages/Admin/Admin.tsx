import "./admin.css";
import { Typography, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import AdminTable from "../../components/Admin/AdminTable";
import CreateNewUser from "../../components/Admin/CreateNewUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/types";
import { fetchAllUsers } from "../../redux/slices/staffSlices";
import TaxTable from "../../components/Admin/TaxTable";
import { fetchTaxeData } from "../../redux/slices/taxes";
import NewTax from "../../components/Admin/NewTax";

function Admin() {
    const users = useSelector((state: RootState) => state.staff.users);
    const taxes = useSelector((state: RootState) => state.tax);
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = useState(false);
    const [openTax, setOpenTax] = useState(false);
    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchAllUsers());
        }
        if (taxes.taxes.length === 0) {
            dispatch(fetchTaxeData());
        }
    }, [dispatch, users]);

    return (
        <div className="restaurant-container">
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "stretch",
                }}
            >
                <Paper elevation={0} className="admin-table-div">
                    <div className="admin-table-div" style={{ width: "100%" }}>
                        <div
                            className="restaurant-header"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <Typography style={{}} fontSize={30} fontWeight="bold">
                                Users Panel
                            </Typography>

                            <div className="header-button-div">
                                {/* <Link className="menu-link" to={"/restaurant/menu"}>
						<Button>View Menu</Button>
					</Link> */}
                                <Button onClick={() => setOpenModal(true)}>Create New User</Button>
                            </div>
                        </div>
                        <AdminTable tableData={users} />
                    </div>
                </Paper>

                <Paper elevation={0} className="tax-table-div" style={{ marginLeft: "2%" }}>
                    <div className="tax-table-div" style={{ width: "100%" }}>
                        <div
                            className="restaurant-header"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenlt",
                            }}
                        >
                            <div style={{ width: "100%" }}>
                                <Typography style={{}} fontSize={30} fontWeight="bold">
                                    Tax Data
                                </Typography>
                            </div>
                            <div className="header-button-div">
                                <Button onClick={() => setOpenTax(true)}>New Tax</Button>
                            </div>
                        </div>
                        <TaxTable tableData={taxes.taxes} />
                    </div>
                </Paper>
                <CreateNewUser open={openModal} setOpenModal={setOpenModal} />
                <NewTax open={openTax} setOpenModal={setOpenTax} />
            </div>
        </div>
    );
}

export default Admin;
