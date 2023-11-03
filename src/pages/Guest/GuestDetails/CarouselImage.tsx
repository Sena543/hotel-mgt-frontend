import "./carouselImage.css";
function CarouselImage({ index, imgUrl, key }: { index: number; imgUrl: string; key: string }) {
    return (
        <div key={`${imgUrl}-${index}`} className="carousel-image-div">
            <img className="carousel-image" loading="lazy" src={imgUrl} alt="room sample" />
        </div>
    );
}

export default CarouselImage;
