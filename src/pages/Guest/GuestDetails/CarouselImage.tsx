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
			}}
		>
			<img loading="lazy" src={imgUrl} alt="room image sample" />
		</div>
	);
}

export default CarouselImage;
