import React, { useEffect, useContext } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
// MUI
import {
	Grid,
	AppBar,
	Typography,
	Button,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CircularProgress,
	TextField,
	Snackbar,
	Alert,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// Contexts
import DispatchContext from "../Contexts/DispatchContext";
import StateContext from "../Contexts/StateContext";

const useStyles = makeStyles({
	formContainer: {
		width: "50%",
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "3rem",
		border: "5px solid black",
		padding: "3rem",
	},
	loginBtn: {
		backgroundColor: "green",
		color: "white",
		fontSize: "1.1rem",
		marginLeft: "1rem",
		"&:hover": {
			backgroundColor: "blue",
		},
	},
});

function AccountCreated() {
	const classes = useStyles();
	const navigate = useNavigate();

	const GlobalDispatch = useContext(DispatchContext);
	const GlobalState = useContext(StateContext);

	return (
		<div className={classes.formContainer}>
			<Typography variant="h4">
				Thanks for signing up! To activate your account, please click on the
				link that has been sent to you!
			</Typography>
		</div>
	);
}

export default AccountCreated;
