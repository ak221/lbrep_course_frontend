import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

// Components
import ProfileUpdate from "./ProfileUpdate";

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
	FormControlLabel,
	Checkbox,
	CardActions,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({});

function Agencies() {
	const classes = useStyles();
	const navigate = useNavigate();
	const GlobalState = useContext(StateContext);

	const initialState = {
		dataIsLoading: true,
		agenciesList: [],
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
			case "catchAgencies":
				draft.agenciesList = action.agenciesArray;
				break;

			case "loadingDone":
				draft.dataIsLoading = false;
				break;
		}
	}

	const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

	// request to get all profiles
	useEffect(() => {
		async function GetAgencies() {
			try {
				const response = await Axios.get(
					`https://www.lbrepcourseapi.com/api/profiles/`
				);

				dispatch({
					type: "catchAgencies",
					agenciesArray: response.data,
				});
				dispatch({ type: "loadingDone" });
			} catch (e) {}
		}
		GetAgencies();
	}, []);

	if (state.dataIsLoading === true) {
		return (
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ height: "100vh" }}
			>
				<CircularProgress />
			</Grid>
		);
	}

	return (
		<Grid
			container
			justifyContent="flex-start"
			spacing={2}
			style={{ padding: "10px" }}
		>
			{state.agenciesList.map((agency) => {
				function PropertiesDisplay() {
					if (agency.seller_listings.length === 0) {
						return (
							<Button disabled size="small">
								No Property
							</Button>
						);
					} else if (agency.seller_listings.length === 1) {
						return (
							<Button
								size="small"
								onClick={() => navigate(`/agencies/${agency.seller}`)}
							>
								One Property listed
							</Button>
						);
					} else {
						return (
							<Button
								size="small"
								onClick={() => navigate(`/agencies/${agency.seller}`)}
							>
								{agency.seller_listings.length} Properties
							</Button>
						);
					}
				}

				if (agency.agency_name && agency.phone_number)
					return (
						<Grid
							key={agency.id}
							item
							style={{ marginTop: "1rem", maxWidth: "20rem" }}
						>
							<Card>
								<CardMedia
									component="img"
									height="140"
									image={
										agency.profile_picture
											? agency.profile_picture
											: defaultProfilePicture
									}
									alt="Profile Picture"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{agency.agency_name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{agency.bio.substring(0, 100)}...
									</Typography>
								</CardContent>
								<CardActions>{PropertiesDisplay()}</CardActions>
							</Card>
						</Grid>
					);
			})}
		</Grid>
	);
}

export default Agencies;
