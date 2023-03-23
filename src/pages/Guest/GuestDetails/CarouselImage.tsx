import React from "react";

function CarouselImage({ imgUrl }: { imgUrl: string }) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "300px",
				width: "100%",
				margin: "10px",
			}}
		>
			<img style={{ borderRadius: "10px" }} loading="lazy" src={imgUrl} alt="room sample" />
		</div>
	);
}

export default CarouselImage;
