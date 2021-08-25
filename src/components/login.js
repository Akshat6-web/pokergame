import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from "../store/userData";

export default function LoginComp() {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.userData.isAuthenticated);
	const [userName, setUserName] = useState("");
	const [passWord, setPassword] = useState("");

	function handleLogin() {
		const data = {
			userName: userName,
			password: passWord,
		};
		dispatch(userLogin(data));
	}

	const handleClickOpen = () => {
		if (isAuth) {
			dispatch(userLogout());
		} else {
			setOpen(true);
		}
	};
	const handleClose = () => {
		setOpen(false);
		handleLogin();
	};

	return (
		<>
			<Button
				style={{ padding: 5 }}
				variant="contained"
				color="secondary"
				onClick={handleClickOpen}
			>
				{isAuth ? "LOGOUT" : "LOGIN"}
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{"Login"}</DialogTitle>
				<DialogContent>
					<DialogContentText style={{ padding: 20 }}>
						<Grid container direction="column" spacing={2}>
							<Grid item>
								<TextField
									variant="outlined"
									label="Username"
									required
									onChange={(e) =>
										setUserName(e.target.value)
									}
									autoComplete="username"
								/>
							</Grid>
							<Grid item>
								{" "}
								<TextField
									variant="outlined"
									label="Password"
									required
									onChange={(e) =>
										setPassword(e.target.value)
									}
									autoComplete="password"
								/>
							</Grid>
						</Grid>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="secondary">
						Cancel
					</Button>
					<Button
						onClick={handleClose}
						color="primary"
						autoFocus
						variant="contained"
					>
						Login
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
