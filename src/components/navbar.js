import { AppBar, Avatar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import LoginComp from "./login";

export default function Navbar() {
	const userData = useSelector((state) => state.userData);
	return (
		<AppBar position="static">
			<Toolbar variant="dense">
				<Typography
					style={{
						fontWeight: 600,
					}}
				>
					Akshat
				</Typography>

				<Typography style={{ marginLeft: "auto", marginRight: 20 }}>
					{/* TODO: show balance with 2 precession points $ */}
					{"Balance : $" + userData.balance}
				</Typography>
				{userData.isAuthenticated && (
					<Avatar
						style={{
							height: 30,
							width: 30,
							marginLeft: 20,
							marginRight: 20,
						}}
					>
						{userData.userName !== "" && userData.userName[0]}
					</Avatar>
				)}
				<LoginComp />
			</Toolbar>
		</AppBar>
	);
}
