import "./menu.css";
import { Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import MenuModal from "../../../components/Restaurant/MenuModal";
import { useEffect, useState } from "react";
import { DeleteForeverRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { fetchRestaurantMenu } from "../../../redux/slices/restaurantSlice";
import { AppDispatch } from "../../../redux/types";

// www.benitos.com/menu/
function Menu() {
	const dispatch = useDispatch<AppDispatch>();
	const [open, setModalOpen] = useState(false);

	useEffect(() => {
		dispatch(fetchRestaurantMenu());
	});
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

	const breakfast = meals.filter(({ mealType }) => mealType === "breakfast");
	const lunch = meals.filter(({ mealType }) => mealType === "lunch");
	const dinner = meals.filter(({ mealType }) => mealType === "supper");

	const renderMealsAndPrices = (mealFilter: any) => {
		return (
			<>
				{mealFilter &&
					mealFilter.map(({ meal, price }: { meal: string; price: number }, index: number) => (
						<div key={`${index}`} className={`dish slide-left`}>
							<Typography variant="h5">{meal.toLocaleUpperCase()}</Typography>
							<span className="element-sep"></span>
							<Typography variant="h4">{price}</Typography>
							<div className="delete-menu-item-icon">
								<IconButton>
									<DeleteForeverRounded />
								</IconButton>
							</div>
						</div>
					))}
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
					<div className="food-list">{renderMealsAndPrices(dinner)}</div>
					<div className="beverages-sides-container">
						<div className="food-header sides-beverages-div">
							<h2>Sides</h2>
							<div className="food-list">{renderMealsAndPrices(dinner)}</div>
						</div>
						<div className="food-header sides-beverages-div">
							<h2>Bevrages</h2>
							<div className="food-list">{renderMealsAndPrices(dinner)}</div>
						</div>
					</div>
				</div>
			</div>
			<MenuModal open={open} setOpenModal={setModalOpen} />
		</>
	);
}

export default Menu;
