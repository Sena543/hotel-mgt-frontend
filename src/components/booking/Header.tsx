import React from "react";

function Header() {
	const links = ["Home", "About", "Teams", "Gallery", "Rooms", "Contact us"];
	return (
		<div className="booking-header-container">
			<div>logo</div>
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
