import React from "react";
import { Link } from "react-router-dom";

function HomeButton() {
	return (
		<Link to="/">
			<button className="home-button">Home</button>
		</Link>
	);
}

export default HomeButton;
