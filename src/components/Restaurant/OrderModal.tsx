import "./order-modal.css";
import GenericModal from "../Modal/GenericModal";
import {
    Autocomplete,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import CustomTextField from "../TextInput/CustomTextField";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuests } from "../../redux/slices/guestSlices";
import { AppDispatch } from "../../redux/types";
import { useEffect, useState } from "react";
import { fetchRestaurantMenu } from "../../redux/slices/restaurantSlice";
import { fetchAllRooms } from "../../redux/slices/roomSlicers";

type OrderModalProps = {
    open: boolean;
    setOpenModal: Function;
};

const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: "Goodfellas", year: 1990 },
    { label: "The Matrix", year: 1999 },
    { label: "Seven Samurai", year: 1954 },
    { label: "Das Boot", year: 1981 },
    { label: "Citizen Kane", year: 1941 },
    { label: "North by Northwest", year: 1959 },
    { label: "Vertigo", year: 1958 },
    { label: "The Kid", year: 1921 },
    { label: "Inglourious Basterds", year: 2009 },
    { label: "Snatch", year: 2000 },
    { label: "3 Idiots", year: 2009 },
    { label: "Monty Python and the Holy Grail", year: 1975 },
];

function OrderModal({ open, setOpenModal }: OrderModalProps) {
    const [guestOrder, setGuestOrder] = useState({
        guestId: "",
        guestName: "",
        roomId: "",
        mealId: "",
        beverageId: "",
        mealPrice: 0,
        beveragePrice: 0,
    });

    const dispatch = useDispatch<AppDispatch>();
    const { guestsData } = useSelector((state: any) => state.guests);
    const { roomList: roomData } = useSelector((state: any) => state.rooms);

    const { restaurantMealsList } = useSelector((state: any) => state.restaurant);

    useEffect(() => {
        if (guestsData.length === 0) {
            dispatch(fetchGuests());
        }
        if (restaurantMealsList.length === 0) {
            dispatch(fetchRestaurantMenu());
        }
        if (roomData.length === 0) {
            dispatch(fetchAllRooms());
        }
    }, [dispatch]);

    const beverages = restaurantMealsList.filter(
        ({ menuType }: { menuType: string }) => menuType === "beverage"
    );
    const meals = restaurantMealsList.filter(
        ({ menuType }: { menuType: string }) => menuType === "dish"
    );

    const guestDetailHanlder = (selectedData: any) => {
        // const guestRoomId = guestsData.filter(({lastName, firstName})=>)
        setGuestOrder((prevState) => ({
            ...prevState,
            guestId: selectedData?.guestID,
            guestName: `${selectedData?.firstName} ${selectedData?.lastName}`,
            roomId: selectedData?.roomAssigned,
        }));
    };

    const mealOrBeveraheHanlder = (idKey: string, priceKey: string, selectedData: any) => {
        // console.log("food:", { idKey, priceKey, selectedData });
        setGuestOrder((prevState) => ({
            ...prevState,
            [idKey]: selectedData?.dishId,
            [priceKey]: Number(selectedData?.price),
        }));
    };

    const submitGuestOrder = () => {
        console.log(guestOrder);
    };
    const dishPriceHandler = (name: string, value: any) => {
        setGuestOrder((prevState) => ({ ...prevState, [name]: Number(value) }));
    };
    return (
        <GenericModal className="order-modal-container" open={open} setOpenModal={setOpenModal}>
            <div className="order-modal-header">
                <Typography variant="h5">Create New Order</Typography>
                <Tooltip title="Close">
                    <IconButton onClick={() => setOpenModal(false)}>
                        <CloseRounded />
                    </IconButton>
                </Tooltip>
            </div>
            <Divider />
            <div className="new-order-form">
                <div className="guest-details-order">
                    <Autocomplete
                        disablePortal
                        loading={guestsData && guestsData.length === 0}
                        isOptionEqualToValue={(option, value) =>
                            option.firstName === value.firstName
                        }
                        getOptionLabel={(option: any) => `${option.firstName} ${option.lastName}`}
                        id="combo-box-demo"
                        onChange={(event: React.SyntheticEvent<Element, Event>, value: any) => {
                            guestDetailHanlder(value);
                        }}
                        onInputChange={(event, newInputValue) =>
                            setGuestOrder({ ...guestOrder, guestName: newInputValue })
                        }
                        options={guestsData}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <CustomTextField
                                {...params}
                                label="Guest Name"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {guestsData && guestsData.length === 0 ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />
                    <CustomTextField
                        value={guestOrder.guestId}
                        label="Guest ID"
                        className="custom-text-field-order-modal"
                    />
                    {/* <CustomTextField label="Room ID" /> */}
                </div>

                <div className="guest-details-order">
                    <CustomTextField
                        className="custom-text-field-order-modal"
                        value={guestOrder.roomId}
                        label="Room ID"
                        style={{ width: "100%" }}
                    />
                </div>

                <div className="guest-details-order ">
                    <Autocomplete
                        disablePortal
                        loading={restaurantMealsList && restaurantMealsList.length === 0}
                        // isOptionEqualToValue={(option, value) => option.title === value.title}
                        onChange={(event: React.SyntheticEvent<Element, Event>, value: any) => {
                            mealOrBeveraheHanlder("mealId", "mealPrice", value);
                        }}
                        onInputChange={(event, newInputValue) =>
                            setGuestOrder({ ...guestOrder, mealId: newInputValue })
                        }
                        getOptionLabel={(option: any) => option.dishOrBev}
                        id="combo-box-demo"
                        options={meals}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <CustomTextField
                                {...params}
                                label="Meals"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {restaurantMealsList &&
                                            restaurantMealsList.length === 0 ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />
                    <CustomTextField
                        className="custom-text-field-order-modal"
                        value={guestOrder.mealPrice}
                        name="mealPrice"
                        onChange={(event) =>
                            dishPriceHandler(event.target.name, event.target.value)
                        }
                        label="Meal Price"
                    />
                </div>
                <div className="guest-details-order ">
                    <Autocomplete
                        disablePortal
                        loading={restaurantMealsList && restaurantMealsList.length === 0}
                        // isOptionEqualToValue={(option, value) => option.title === value.title}
                        getOptionLabel={(option: any) => option.dishOrBev}
                        onChange={(event: React.SyntheticEvent<Element, Event>, value: any) => {
                            mealOrBeveraheHanlder("beverageId", "beveragePrice", value);
                        }}
                        onInputChange={(event, newInputValue) =>
                            setGuestOrder({ ...guestOrder, beverageId: newInputValue })
                        }
                        id="combo-box-demo"
                        options={beverages}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <CustomTextField
                                {...params}
                                label="Beverages"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {restaurantMealsList &&
                                            restaurantMealsList.length === 0 ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />
                    <CustomTextField
                        name="beveragePrice"
                        value={guestOrder.beveragePrice}
                        onChange={(event) =>
                            dishPriceHandler(event.target.name, event.target.value)
                        }
                        className="custom-text-field-order-modal"
                        label="Price"
                    />
                </div>
                <div className="button-div">
                    <Button
                        // style={{ width: "80% !important" }}
                        onClick={submitGuestOrder}
                        variant="contained"
                        className="create-order-button"
                    >
                        Create
                    </Button>
                </div>
            </div>
        </GenericModal>
    );
}

export default OrderModal;
