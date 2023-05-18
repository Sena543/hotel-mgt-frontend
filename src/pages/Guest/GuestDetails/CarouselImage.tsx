import "./carouselImage.css";
function CarouselImage({ index, imgUrl, key }: { index: number; imgUrl: string; key?: string }) {
    return (
        <div
            key={`${imgUrl}-${index}`}
            className="carousel-image-div"
            // style={{
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     height: "300px",
            //     width: "100%",
            //     // margin: "10px",
            // }}
        >
            <img
                className="carousel-image"
                // style={{ borderRadius: "10px" }}
                loading="lazy"
                src={imgUrl}
                alt="room sample"
            />
        </div>
    );
}

export default CarouselImage;
