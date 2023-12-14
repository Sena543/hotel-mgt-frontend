import "./styles/gallery.css";
import { Typography } from "@mui/material";
import React from "react";

function OurServices() {
	return (
		<div className="our-services-div-container " id="gallery">
			<div className="gallery">
			<div className="clipped-border">
				<img
					src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.gettyimages.com.au%2Fgi-resources%2Fimages%2Ffrontdoor%2Fcreative%2FPanoramicImagesRM%2FFD_image.jpg&f=1"
					id="clipped"
				/>
			</div>
			<div className="clipped-border">
				<img
					src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fbpucette.b.p.pic.centerblog.net%2Ffv86ll9r.jpg&f=1"
					id="clipped"
				/>
			</div>
			<div className="clipped-border">
				<img
					src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fimagejournal.org%2Fwp-content%2Fuploads%2Fbb-plugin%2Fcache%2F23466317216_b99485ba14_o-panorama.jpg&f=1"
					id="clipped"
				/>
			</div>
			<div className="clipped-border">
				<img
					src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.lokeshdhakar.com%2Fprojects%2Flightbox2%2Fimages%2Fimage-4.jpg&f=1"
					id="clipped"
				/>
			</div>
			<div className="clipped-border">
				<img
					src="https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
					id="clipped"
				/>
			</div>
			{/* <div className="shadow"></div> */}
			</div>
			<div>
				<Typography variant="h3"> Our Gallery</Typography>
			</div>
		</div>
	);
}

export default OurServices;
