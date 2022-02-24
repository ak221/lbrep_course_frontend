import React, { useState } from "react";
import { Link } from "react-router-dom";

// MUI imports
import { Button, Typography, Grid, AppBar, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Components
import CustomCard from "./CustomCard";
import Header from "./Header";

// Assets
import city from "./Assets/city.jpg";

const useStyles = makeStyles({
	cityImg: {
		width: "100%",
		height: "92vh",
	},

	overlayText: {
		position: "absolute",
		zIndex: "100",
		top: "100px",
		left: "20px",
		textAlign: "center",
	},

	homeText: {
		color: "white",
		fontWeight: "bolder",
	},
	homeBtn: {
		fontSize: "3.5rem",
		borderRadius: "15px",
		backgroundColor: "green",
		marginTop: "2rem",
		boxShadow: "3px 3px 3px white",
	},
});

function Home() {
	const [btnColor, setBtnColor] = useState("error");
	const classes = useStyles();
	return (
		<>
			<div style={{ position: "relative" }}>
				<img src={city} className={classes.cityImg} />
				<div className={classes.overlayText}>
					<Typography variant="h1" className={classes.homeText}>
						FIND YOUR <span style={{ color: "green" }}>NEXT PROPERTY</span> ON
						THE LBREP WEBSITE
					</Typography>
					<Button variant="contained" className={classes.homeBtn}>
						SEE ALL PROPERTIES
					</Button>
				</div>
			</div>
		</>
	);
}

export default Home;
