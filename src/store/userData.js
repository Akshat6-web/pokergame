import { createSlice } from "@reduxjs/toolkit";
const intitalMoney = 10.0; //can change based on requirement
const userDataSlice = createSlice({
	name: "userData",
	initialState: {
		isAuthenticated: false,
		userName: "Guest",
		password: "",
		balance: intitalMoney, //initial money in account
		history: [],
		isGameOver: false,
	},
	reducers: {
		//login reducers
		userLogin: (state, action) => ({
			...state,
			isAuthenticated: true,
			userName: action.payload.userName,
			password: action.payload.password,
			// balance: intitalMoney,
			// history: [],
			// isGameOver: false,
		}),
		// logout reducers
		userLogout: (state, action) => ({
			...state,
			isAuthenticated: false,
			userName: "Guest",
			password: "",
			balance: intitalMoney,
			history: [],
			isGameOver: false,
		}),

		addBalance: (state, action) => ({
			...state,
			balance: state.balance + action.payload,
		}),
		addHistory: (state, action) => ({
			...state,
			history: [...state.history, action.payload],
		}),
		gameOver: (state, action) => ({
			...state,
			isGameOver: true,
		}),
		gameNotOver: (state, action) => ({
			...state,
			isGameOver: false,
		}),
	},
});
export const {
	userLogin,
	userLogout,
	addBalance,
	addHistory,
	gameOver,
	gameNotOver,
} = userDataSlice.actions;

export default userDataSlice.reducer;
