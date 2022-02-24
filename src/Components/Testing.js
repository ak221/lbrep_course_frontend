import React, { useEffect, useState, useReducer } from "react";
import { useImmerReducer } from "use-immer";

function Testing() {
	const initialState = {
		appleCount: 1,
		bananaCount: 10,
		message: "Hello",
		happy: false,
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
			case "addApple":
				draft.appleCount = draft.appleCount + 1;
				break;
			case "changeEverything":
				draft.bananaCount = draft.bananaCount + 10;
				draft.message = action.customMessage;
				draft.happy = true;
				break;
		}
	}

	const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

	return (
		<>
			<div>Right now the count of apple is {state.appleCount}</div>
			<div>Right now the count of bananas is {state.bananaCount}</div>
			<div>Right now the message {state.message}</div>
			{state.happy ? (
				<h1>Thank for being happy</h1>
			) : (
				<h1>There is no happiness</h1>
			)}
			<br />
			<button onClick={() => dispatch({ type: "addApple" })}>Add Apple</button>
			<br />
			<button
				onClick={() =>
					dispatch({
						type: "changeEverything",
						customMessage: "The message is now coming from the disptach",
					})
				}
			>
				CHANGE EVERYTHING
			</button>
		</>
	);
}

export default Testing;
