import "./carouselImage.css";
function CarouselImage({ index, imgUrl }: { index: number; imgUrl: string }) {
	return (
		<div key={`${imgUrl}-${index}`} className="carousel-image-div">
			<img className="carousel-image" loading="lazy" src={imgUrl} alt="room sample" />
		</div>
	);
}

export default CarouselImage;
