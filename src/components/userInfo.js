import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

export default function UserInfo() {
	const userData = useSelector((state) => state.userData);
	return (
		<div style={{ width: "100%", display: "flex" }}>
			<Paper
				elevation={10}
				style={{
					marginLeft: "auto",
					marginRight: "auto",
					padding: 40,
					marginTop: 40,
				}}
			>
				<Grid container direction="column" spacing={4}>
					<Grid item>
						<Typography variant="h4">
							User Name : {userData.userName}
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h4">
							Balance : {"$" + userData.balance}
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h4">
							Rounds Played : {userData.history.length}
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}
