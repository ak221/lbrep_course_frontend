import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// MUI imports
import {
	Button,
	Typography,
	Grid,
	AppBar,
	Toolbar,
	Menu,
	MenuItem,
	Snackbar,
} from "@mui/material";

// Contexts
import StateContext from "../Contexts/StateContext";
import DispatchContext from "../Contexts/DispatchContext";

// Components
import CustomCard from "./CustomCard";

function Header() {
	const navigate = useNavigate();
	const GlobalState = useContext(StateContext);
	const GlobalDispatch = useContext(DispatchContext);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	function HandleProfile() {
		setAnchorEl(null);
		navigate("/profile");
	}

	const [openSnack, setOpenSnack] = useState(false);

	async function HandleLogout() {
		setAnchorEl(null);
		const confirmLogout = window.confirm("Are you sure you want to leave?");
		if (confirmLogout) {
			try {
				const response = await Axios.post(
					"https://www.lbrepcourseapi.com/api-auth-djoser/token/logout/",
					GlobalState.userToken,
					{ headers: { Authorization: "Token ".concat(GlobalState.userToken) } }
				);

				GlobalDispatch({ type: "logout" });
				setOpenSnack(true);
			} catch (e) {}
		}
	}

	useEffect(() => {
		if (openSnack) {
			setTimeout(() => {
				navigate(0);
			}, 1500);
		}
	}, [openSnack]);

	return (
		<AppBar position="static" style={{ backgroundColor: "black" }}>
			<Toolbar>
				<div style={{ marginRight: "auto" }}>
					<Button color="inherit" onClick={() => navigate("/")}>
						<Typography variant="h4">LBREP</Typography>{" "}
					</Button>
				</div>
				<div>
					<Button
						color="inherit"
						onClick={() => navigate("/listings")}
						style={{ marginRight: "2rem" }}
					>
						<Typography variant="h6">Listings</Typography>{" "}
					</Button>
					<Button
						color="inherit"
						style={{ marginLeft: "2rem" }}
						onClick={() => navigate("/agencies")}
					>
						{" "}
						<Typography variant="h6">Agencies</Typography>{" "}
					</Button>
				</div>
				<div style={{ marginLeft: "auto", marginRight: "10rem" }}>
					<Button
						onClick={() => navigate("/addproperty")}
						style={{
							backgroundColor: "green",
							color: "white",
							width: "15rem",
							fontSize: "1.1rem",
							// marginRight: "1rem",
							// "&:hover": {
							// 	backgroundColor: "blue",
							// },
						}}
					>
						Add Property
					</Button>

					{GlobalState.userIsLogged ? (
						<Button
							style={{
								backgroundColor: "white",
								color: "black",
								width: "15rem",
								fontSize: "1.1rem",
								marginLeft: "1rem",
								// "&:hover": {
								// 	backgroundColor: "green",
								// },
							}}
							onClick={handleClick}
							// onClick={() => navigate("/login")}
						>
							{GlobalState.userUsername}
						</Button>
					) : (
						<Button
							style={{
								backgroundColor: "white",
								color: "black",
								width: "15rem",
								fontSize: "1.1rem",
								marginLeft: "1rem",
								// "&:hover": {
								// 	backgroundColor: "green",
								// },
							}}
							onClick={() => navigate("/login")}
						>
							Login
						</Button>
					)}

					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
					>
						<MenuItem
							style={{
								color: "black",
								backgroundColor: "green",
								width: "15rem",
								fontWeight: "bolder",
								borderRadius: "15px",
								marginBottom: "0.25rem",
							}}
							onClick={HandleProfile}
						>
							Profile
						</MenuItem>
						<MenuItem
							style={{
								color: "black",
								backgroundColor: "red",
								width: "15rem",
								fontWeight: "bolder",
								borderRadius: "15px",
							}}
							onClick={HandleLogout}
						>
							Logout
						</MenuItem>
					</Menu>
					<Snackbar
						open={openSnack}
						message="You have successfully logged out!"
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
					/>
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
