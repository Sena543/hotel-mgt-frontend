import React from "react";
import LogoImg from "../../assets/images/logo.jpg";
// import LogoImg from "../../../public/assets/images/logo.jpg";

function Header() {
	const links = ["Home", "About", "Teams", "Gallery", "Rooms", "Contact us"];
	return (
		<div className="booking-header-container">
			{/* <div>logo</div> */}
			<img src={LogoImg} loading="lazy" height={"100%"} width={"12%"} />
			<div className="links-div" style={{}}>
				{links &&
					links.map((link) => (
						<a
							href={`#${link.toLowerCase().replaceAll(/\s/g, "")}`}
							key={link}
							style={{ textDecoration: "none", color: "#80529d" }}
						>
							{link}
						</a>
					))}
			</div>
		</div>
	);
}

export default Header;
