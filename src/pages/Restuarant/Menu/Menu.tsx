import "./menu.css";
import { Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import MenuModal from "../../../components/Restaurant/MenuModal";
import { useEffect, useState } from "react";
import { DeleteForeverRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantMenu, deleteMenuItem } from "../../../redux/slices/restaurantSlice";
import { AppDispatch } from "../../../redux/types";
import { filterMenuItems } from "../../../utils/util-functions";

// www.benitos.com/menu/
function Menu() {
	const dispatch = useDispatch<AppDispatch>();
	const { restaurantMealsList } = useSelector((state: any) => state.restaurant);
	const [open, setModalOpen] = useState(false);

	useEffect(() => {
		dispatch(fetchRestaurantMenu());
	}, []);
	const meals = [
		{
			meal: "Chicken Taco",
			price: "3.99",
			description:
				"Succulent hand-shredded pork, grilled then smothered with our fresh homemade guacamole and salsa Mexicana, wrapped in a warm, soft corn tortilla.",
			mealType: "breakfast",
		},
		{
			meal: "Chicken Taco",
			price: "3.99",
			description:
				"Succulent hand-shredded pork, grilled then smothered with our fresh homemade guacamole and salsa Mexicana, wrapped in a warm, soft corn tortilla.",
			mealType: "lunch",
		},
		{
			meal: "Beef Taco",
			price: "3.99",
			description:
				"Succulent hand-shredded pork, grilled then smothered with our fresh homemade guacamole and salsa Mexicana, wrapped in a warm, soft corn tortilla.",
			mealType: "supper",
		},
		{
			meal: "CARNE ASADA Taco",
			price: "3.99",
			description:
				"Succulent hand-shredded pork, grilled then smothered with our fresh homemade guacamole and salsa Mexicana, wrapped in a warm, soft corn tortilla.",
			mealType: "breakfast",
		},
		{
			meal: "Chicken Taco",
			price: "3.99",
			description:
				"Succulent hand-shredded pork, grilled then smothered with our fresh homemade guacamole and salsa Mexicana, wrapped in a warm, soft corn tortilla.",
			mealType: "lunch",
		},
		{
			meal: "Chicken Taco",
			price: "3.99",
			description:
				"Succulent hand-shredded pork, grilled then smothered with our fresh homemade guacamole and salsa Mexicana, wrapped in a warm, soft corn tortilla.",
			mealType: "supper",
		},
		{
			meal: "Chicken Taco",
			price: "3.99",
			description:
				"Succulent hand-shredded pork, grilled then smothered with our fresh homemade guacamole and salsa Mexicana, wrapped in a warm, soft corn tortilla.",
			mealType: "breakfast",
		},
		{
			meal: "Chicken Taco",
			price: "3.99",
			description:
				"Succulent hand-shredded pork, grilled then smothered with our fresh homemade guacamole and salsa Mexicana, wrapped in a warm, soft corn tortilla.",
			mealType: "lunch",
		},
		{
			meal: "Chicken Taco",
			price: "3.99",
			description:
				"Succulent hand-shredded pork, grilled then smothered with our fresh homemade guacamole and salsa Mexicana, wrapped in a warm, soft corn tortilla.",
			mealType: "supper",
		},
	];

	const breakfast = filterMenuItems(restaurantMealsList, "breakfast", "dish");
	const lunch = filterMenuItems(restaurantMealsList, "lunch", "dish");
	const dinner = filterMenuItems(restaurantMealsList, "dinner", "dish");
	const beverage = filterMenuItems(restaurantMealsList, "beverage", "beverage");
	// const breakfast = meals.filter(({ mealType }) => mealType === "breakfast");
	// const lunch = meals.filter(({ mealType }) => mealType === "lunch");
	// const dinner = meals.filter(({ mealType }) => mealType === "supper");

	// console.log("restaurant", restaurantMealsList);
	// console.log("bevs", beverage);

	const deleteItemFromMenu = (dishId: any) => {
		// dispatch(deleteMenuItem(dishId));
		//TODO
		//delete menu item
	};
	const renderMealsAndPrices = (mealFilter: any) => {
		return (
			<>
				{mealFilter &&
					mealFilter.map(
						(
							{
								price,
								// dishType,
								// dishId,
								// description,
								// menuType,
								dishOrBev,
							}: {
								price: string;
								dishType: string;
								dishId: string;
								description: string;
								menuType: string;
								dishOrBev: string;
							},
							index: number
						) => (
							<div key={`${index}`} className={`dish slide-left`}>
								<Typography variant="h5">{dishOrBev.toLocaleUpperCase()}</Typography>
								<span className="element-sep"></span>
								<Typography variant="h4">{price}</Typography>
								<div className="delete-menu-item-icon">
									<IconButton onClick={() => deleteItemFromMenu(index)}>
										<DeleteForeverRounded />
									</IconButton>
								</div>
							</div>
						)
					)}
			</>
		);
	};

	return (
		<>
			<div className="menu-container">
				<div className="menu-header">
					<Typography style={{}} fontSize={30} fontWeight="bold">
						Menu
					</Typography>

					<div className="menu-button-div">
						<Button onClick={() => setModalOpen(true)}>Add New Dish</Button>
					</div>
				</div>
				<div>
					<div className="food-header">
						<h2>Breakfast</h2>
					</div>
					<div className="food-list">{renderMealsAndPrices(breakfast)}</div>
					<div className="food-header">
						<h2>Lunch</h2>
					</div>
					<div className="food-list">{renderMealsAndPrices(lunch)}</div>
					<div className="food-header">
						<h2>Dinner</h2>
					</div>
					{/* <div className="food-list">{renderMealsAndPrices(dinner)}</div> */}
					<div className="beverages-sides-container">
						{/* <div className="food-header sides-beverages-div">
							<h2>Sides</h2>
							<div className="food-list">{renderMealsAndPrices(dinner)}</div>
						</div> */}
						<div className="food-header sides-beverages-div">
							<h2>Bevrages</h2>
							<div className="food-list">{renderMealsAndPrices(beverage)}</div>
						</div>
					</div>
				</div>
			</div>
			<MenuModal open={open} setOpenModal={setModalOpen} />
		</>
	);
}

export default Menu;
