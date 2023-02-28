import { MoreVertRounded, Star } from "@mui/icons-material";
import { Typography, IconButton, Tooltip } from "@mui/material";
import profile from "../../../assets/images/profile.jpg";

function ReviewComponent() {
	return (
		<div>
			{/*  */}
			<div>
				<div className="customer generic-flex-justify-content-style">
					<div className="reviewer-profile generic-flex-justify-content-style">
						<img className="review-img-icon" loading="lazy" src={profile} alt="Guest image" />
						<div className="customer-dets generic-flex-justify-content-style">
							<Typography fontWeight={"bolder"}>Santa Claus</Typography>
							<Typography color={"gray"} fontSize="12px">
								Posted on 20/02/2023
							</Typography>
						</div>
					</div>
					<div className="star-ratings">
						<Star />
						<Star />
						<Star />
						<Star />
						<Star />
					</div>
				</div>
				<div className="customer-comments  generic-flex-justify-content-style">
					<Typography>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam doloribus soluta porro impedit
						vitae pariatur modi ipsum non? Ut, blanditiis totam dolore beatae debitis atque. Est, assumenda?
						Deleniti, reiciendis distinctio.
					</Typography>
				</div>
			</div>
		</div>
	);
}

export default ReviewComponent;
