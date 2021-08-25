import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Paper, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const columns = [
	{ field: "id", headerName: "ID", width: 100 },
	{
		field: "time",
		headerName: "Time",
		width: 200,
		editable: false,
		description: "Time of the roll",
	},
	{
		field: "slots",
		headerName: "Slots",
		description: "This is the result of that roll",
		sortable: false,
		width: 100,
	},
];

export default function HistoryTable() {
	const rows = useSelector((state) => state.userData.history);
	return (
		<Paper
			style={{
				height: 650,
				width: 500,
				marginLeft: "auto",
				marginRight: "auto",
				padding: 40,
				paddingBottom: 120,
			}}
		>
			<Typography variant="h2" gutterBottom>
				{" "}
				Player History{" "}
			</Typography>
			{rows.length === 0 && (
				<Typography variant="h3" color="secondary">
					{" "}
					No Rolls made yet!
				</Typography>
			)}
			{rows.length > 0 && (
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={10}
					disableSelectionOnClick
				/>
			)}
		</Paper>
	);
}
