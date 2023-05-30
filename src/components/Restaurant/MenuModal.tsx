import "./menu-modal.css";
import { CloseRounded } from "@mui/icons-material";
import {
    Typography,
    IconButton,
    Divider,
    Autocomplete,
    Button,
    Tooltip,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    CircularProgress,
} from "@mui/material";
import GenericModal from "../Modal/GenericModal";
import CustomTextField from "../TextInput/CustomTextField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewMenuItem, resetStatus } from "../../redux/slices/restaurantSlice";
import { AppDispatch } from "../../redux/types";
import GenericAlert from "../Alert/Alert";

type MenuModalProps = {
    open: boolean;
    setOpenModal: Function;
};

const dish_type = ["Breakfast", "Lunch", "Dinner"];

function MenuModal({ open, setOpenModal }: MenuModalProps) {
    const { status, restaurantMealsList } = useSelector((state: any) => state.restaurant);
    const [openAlert, setOpenAlert] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const [menuItem, setMenuItem] = useState({
        menuType: "dish",
        dishOrBev: "",
        price: "",
        dishType: "Breakfast",
        description: "",
        dishId: restaurantMealsList.length + 1,
        //TODO
        //fix dishID not updating bug
    });
    const [showErr, setShowErr] = useState(false);

    useEffect(() => {}, [restaurantMealsList, dispatch]);
    const handleRadioChange = (name: string, value: string) => {
        setMenuItem((prevState) => ({
            ...prevState,
            [name]: value,
            // menuType: prevState.menuType === "beverage" ? "beverage" : "dish",
        }));
    };

    const submitData = () => {
        if (menuItem.dishOrBev === "" || menuItem.price === "") {
            setShowErr(true);
            return;
        }
        dispatch(createNewMenuItem(menuItem));
        setMenuItem({
            menuType: "dish",
            dishOrBev: "",
            price: "",
            dishType: "Breakfast",
            description: "",
            dishId: 0,
        });
        status === "success" ? setOpenAlert(() => true) : null;
        dispatch(resetStatus());
    };
    return (
        <GenericModal className="menu-modal-container" open={open} setOpenModal={setOpenModal}>
            <div className="menu-modal-header">
                <Typography variant="h5">Add New Dish</Typography>
                <Tooltip title="Close">
                    <IconButton onClick={() => setOpenModal(false)}>
                        <CloseRounded />
                    </IconButton>
                </Tooltip>
            </div>
            <Divider />
            <div className="dish-form">
                <div>
                    <FormControl>
                        <RadioGroup
                            value={menuItem.menuType}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handleRadioChange(event.target.name, event.target.value);
                            }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="menuType"
                            defaultValue={"dish"}
                        >
                            <FormControlLabel value="dish" control={<Radio />} label="Dishes" />
                            <FormControlLabel
                                value="beverage"
                                control={<Radio />}
                                label="Beverages"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                {menuItem.menuType === "dish" ? (
                    <>
                        <CustomTextField
                            label="Meal"
                            name="dishOrBev"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                handleRadioChange(event.target.name, event.target.value)
                            }
                            value={menuItem.dishOrBev}
                            error={!menuItem.dishOrBev && showErr}
                            required
                            helperText={
                                menuItem.dishOrBev === "" && showErr ? "Field is required" : null
                            }
                            className="menu-modal-text-field"
                        />
                        <CustomTextField
                            label="Price"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                handleRadioChange(event.target.name, event.target.value)
                            }
                            name="price"
                            error={!menuItem.price && showErr}
                            required
                            helperText={
                                menuItem.price === "" && showErr ? "Field is required" : null
                            }
                            value={menuItem.price}
                            className="menu-modal-text-field"
                        />

                        <div className="menu-autocomplete">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={dish_type}
                                isOptionEqualToValue={(option, value) => option === value}
                                getOptionLabel={(option: string) => option}
                                fullWidth
                                value={menuItem.dishType}
                                onChange={(
                                    event: React.SyntheticEvent<Element, Event>,
                                    value: any
                                ) => handleRadioChange("dishType", value)}
                                className="menu-modal-text-field"
                                renderInput={(params) => (
                                    <CustomTextField
                                        {...params}
                                        fullWidth
                                        className="menu-modal-text-field"
                                        label="Dish Type"
                                    />
                                )}
                            />
                        </div>
                        {/* <CustomTextField className="menu-modal-text-field" label="Description" rows={5} multiline /> */}
                    </>
                ) : (
                    <>
                        <CustomTextField
                            name="dishOrBev"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                handleRadioChange(event.target.name, event.target.value)
                            }
                            label="Beverage"
                            className="menu-modal-text-field"
                        />
                        <CustomTextField
                            name="price"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                handleRadioChange(event.target.name, event.target.value)
                            }
                            label="Price"
                            className="menu-modal-text-field"
                        />

                        {/* <div className="menu-autocomplete">
							<Autocomplete
								disablePortal
								id="combo-box-demo"
								options={dish_type}
								fullWidth
								className="menu-modal-text-field"
								renderInput={(params) => (
									<CustomTextField
										{...params}
										fullWidth
										className="menu-modal-text-field"
										label="Dish Type"
									/>
								)}
							/>
						</div> */}
                    </>
                )}

                <CustomTextField
                    name="description"
                    value={menuItem.description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleRadioChange(event.target.name, event.target.value)
                    }
                    className="menu-modal-text-field"
                    label="Description"
                    rows={5}
                    multiline
                />
                <div className="button-div">
                    {status === "loading" ? (
                        <CircularProgress />
                    ) : (
                        <Button
                            onClick={submitData}
                            variant="contained"
                            className="create-order-button"
                        >
                            Add
                        </Button>
                    )}
                </div>
            </div>
            <GenericAlert
                severity="success"
                message="Operation completed successfully"
                open={openAlert}
                setOpen={setOpenAlert}
            />
        </GenericModal>
    );
}

export default MenuModal;
