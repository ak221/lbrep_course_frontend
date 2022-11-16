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

// Contexts
import DispatchContext from "../Contexts/DispatchContext";
import StateContext from "../Contexts/StateContext";

function Login() {
	const navigate = useNavigate();

	const GlobalDispatch = useContext(DispatchContext);
	const GlobalState = useContext(StateContext);

	const initialState = {
		usernameValue: "",
		passwordValue: "",
		sendRequest: 0,
		token: "",
		openSnack: false,
		disabledBtn: false,
		serverError: false,
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
			case "catchUsernameChange":
				draft.usernameValue = action.usernameChosen;
				draft.serverError = false;
				break;

			case "catchPasswordChange":
				draft.passwordValue = action.passwordChosen;
				draft.serverError = false;
				break;

			case "changeSendRequest":
				draft.sendRequest = draft.sendRequest + 1;
				break;

			case "catchToken":
				draft.token = action.tokenValue;
				break;

			case "openTheSnack":
				draft.openSnack = true;
				break;

			case "disableTheButton":
				draft.disabledBtn = true;
				break;

			case "allowTheButton":
				draft.disabledBtn = false;
				break;

			case "catchServerError":
				draft.serverError = true;
				break;
		}
	}

	const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

	function FormSubmit(e) {
		e.preventDefault();

		dispatch({ type: "changeSendRequest" });
		dispatch({ type: "disableTheButton" });
	}

	useEffect(() => {
		if (state.sendRequest) {
			const source = Axios.CancelToken.source();
			async function SignIn() {
				try {
					const response = await Axios.post(
						"https://www.lbrepcourseapi.com/api-auth-djoser/token/login/",
						{
							username: state.usernameValue,
							password: state.passwordValue,
						},
						{
							cancelToken: source.token,
						}
					);

					dispatch({
						type: "catchToken",
						tokenValue: response.data.auth_token,
					});
					GlobalDispatch({
						type: "catchToken",
						tokenValue: response.data.auth_token,
					});
					// navigate("/");
				} catch (error) {
					dispatch({ type: "allowTheButton" });
					dispatch({ type: "catchServerError" });
				}
			}
			SignIn();
			return () => {
				source.cancel();
			};
		}
	}, [state.sendRequest]);

	// Get user info
	useEffect(() => {
		if (state.token !== "") {
			const source = Axios.CancelToken.source();
			async function GetUserInfo() {
				try {
					const response = await Axios.get(
						"https://www.lbrepcourseapi.com/api-auth-djoser/users/me/",
						{
							headers: { Authorization: "Token ".concat(state.token) },
						},
						{
							cancelToken: source.token,
						}
					);

					GlobalDispatch({
						type: "userSignsIn",
						usernameInfo: response.data.username,
						emailInfo: response.data.email,
						IdInfo: response.data.id,
					});
					dispatch({ type: "openTheSnack" });
				} catch (error) {}
			}
			GetUserInfo();
			return () => {
				source.cancel();
			};
		}
	}, [state.token]);

	useEffect(() => {
		if (state.openSnack) {
			setTimeout(() => {
				navigate("/");
			}, 1500);
		}
	}, [state.openSnack]);

	return (
		<div
			style={{
				width: "50%",
				marginLeft: "auto",
				marginRight: "auto",
				marginTop: "3rem",
				border: "5px solid black",
				padding: "3rem",
			}}
		>
			<form onSubmit={FormSubmit}>
				<Grid item container justifyContent="center">
					<Typography variant="h4">SIGN IN</Typography>
				</Grid>

				{state.serverError ? (
					<Alert severity="error">Incorrect username or password!</Alert>
				) : (
					""
				)}

				<Grid item container style={{ marginTop: "1rem" }}>
					<TextField
						id="username"
						label="Username"
						variant="outlined"
						fullWidth
						value={state.usernameValue}
						onChange={(e) =>
							dispatch({
								type: "catchUsernameChange",
								usernameChosen: e.target.value,
							})
						}
						error={state.serverError ? true : false}
					/>
				</Grid>

				<Grid item container style={{ marginTop: "1rem" }}>
					<TextField
						id="password"
						label="Password"
						variant="outlined"
						fullWidth
						type="password"
						value={state.passwordValue}
						onChange={(e) =>
							dispatch({
								type: "catchPasswordChange",
								passwordChosen: e.target.value,
							})
						}
						error={state.serverError ? true : false}
					/>
				</Grid>

				<Grid
					item
					container
					xs={8}
					style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
				>
					<Button
						variant="contained"
						fullWidth
						type="submit"
						style={{
							backgroundColor: "green",
							color: "white",
							fontSize: "1.1rem",
							marginLeft: "1rem",
							"&:hover": {
								backgroundColor: "blue",
							},
						}}
						disabled={state.disabledBtn}
					>
						SIGN IN
					</Button>
				</Grid>
			</form>

			<Grid
				item
				container
				justifyContent="center"
				style={{ marginTop: "1rem" }}
			>
				<Typography variant="small">
					Don't have an account yet?{" "}
					<span
						onClick={() => navigate("/register")}
						style={{ cursor: "pointer", color: "green" }}
					>
						SIGN UP
					</span>
				</Typography>
			</Grid>
			<Snackbar
				open={state.openSnack}
				message="You have successfully logged in"
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
			/>
		</div>
	);
}

export default Login;
