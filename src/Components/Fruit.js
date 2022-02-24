import React from "react";

function Fruit(props) {
	return (
		<h1>
			This is a {props.color} {props.name}
		</h1>
	);
}

export default Fruit;
