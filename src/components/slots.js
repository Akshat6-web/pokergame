import { Button, Dialog, Grid, Snackbar, Typography } from "@material-ui/core";
import React, { Component, createRef, useEffect, useState } from "react";
import "./slots.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
	addBalance,
	addHistory,
	gameNotOver,
	gameOver,
} from "../store/userData";

function SimpleDialog(props) {
	const { onClose, open } = props;
	const [snackValue, setSnackValue] = useState(0);

	const userData = useSelector((state) => state.userData);
	const [openSnack, setOpenSnack] = React.useState(false);
	const dispatch = useDispatch();
	function handleBalance(data) {
		setSnackValue(data + 2);
		setOpenSnack(true);
		dispatch(addBalance(data));
	}
	function handleNewRoll(data) {
		const currTime = new Date().toLocaleTimeString();

		const newData = {
			id: userData.history.length + 1,
			time: currTime,
			slots: data,
		};
		dispatch(addHistory(newData));
	}

	const handleClose = () => {
		onClose();
	};
	const handleCloseSnack = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnack(false);
	};

	return (
		<>
			<Dialog
				onClose={handleClose}
				aria-labelledby="simple-dialog-title"
				open={open}
			>
				<div style={{ padding: 40 }}>
					<Slots
						close={onClose}
						handleNewRoll={handleNewRoll}
						handleBalance={handleBalance}
						isGameOver={userData.isGameOver}
					/>
				</div>
			</Dialog>
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				open={openSnack}
				autoHideDuration={2500}
				onClose={handleCloseSnack}
				message={
					"You earned : $" + snackValue + "\t\t | \t\t Roll costed $2"
				}
			/>
		</>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};
export default function Game() {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.userData);
	useEffect(() => {
		if (userData.balance < 2) {
			dispatch(gameOver());
		} else {
			dispatch(gameNotOver());
		}
	}, [userData, dispatch]);
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = (value) => {
		setOpen(false);
	};
	return (
		<div style={{ marginRight: "auto", marginLeft: "auto", marginTop: 80 }}>
			<Button
				variant="contained"
				color="secondary"
				onClick={handleClickOpen}
				style={{
					height: 100,
					width: 200,
				}}
				disabled={userData.isGameOver}
			>
				Start Game !
			</Button>
			{userData.isGameOver && (
				<Typography
					variant="h2"
					style={{ color: "red", fontWeight: 600 }}
				>
					Game Over !
				</Typography>
			)}
			<SimpleDialog open={open} onClose={handleClose} />
		</div>
	);
}
class Slots extends Component {
	static defaultProps = {
		slots: ["♠", "♥", "♦", "♣"],
	};

	constructor(props) {
		super(props);
		this.state = {
			slot1: "♠",
			slot2: "♠",
			slot3: "♠",
			rolling: false,
			audio: new Audio("/audio.mp3"),
		};

		// get ref of dice on which elements will roll
		this.slotRef = [createRef(), createRef(), createRef()];
	}

	startAudio = () => {
		this.state.audio.play();
	};

	// to trigger roolling and maintain state
	roll = (debugMode) => {
		this.startAudio();
		this.setState({
			rolling: true,
		});
		setTimeout(() => {
			this.setState({ rolling: false });
		}, 2500);

		// looping through all 3 slots to start rolling
		var newData = "";

		this.slotRef.forEach((slot, i) => {
			// this will trigger rolling effect
			const selected = this.triggerSlotRotation(slot.current, debugMode);
			newData = newData.concat(selected);
			this.setState({ [`slot${i + 1}`]: selected });
		});

		var balanceChange = -2;
		var sorted = newData;
		sorted = sorted.split("").sort().join("");
		//TODO : calculate new balance based on the result
		//all unequal
		if (sorted[0] !== sorted[1] && sorted[1] !== sorted[2]) {
			balanceChange += 0;
		} else if (sorted[0] === sorted[1] && sorted[1] === sorted[2]) {
			if (sorted[0] === "♠") {
				balanceChange += 5;
			} else {
				balanceChange += 2;
			}
		} else {
			balanceChange += 0.5;
		}
		//TODO : update the state in the redux store
		this.props.handleBalance(balanceChange);
		this.props.handleNewRoll(newData);
	};

	// this will create a rolling effect and return random selected option
	triggerSlotRotation = (ref, debugMode) => {
		function setTop(top) {
			ref.style.top = `${top}px`;
		}
		let options = ref.children;
		let randomOption = Math.floor(
			Math.random() * Slots.defaultProps.slots.length
		);
		if (debugMode) {
			randomOption = 0;
		}

		let choosenOption = options[randomOption];
		setTop(-choosenOption.offsetTop + 2);
		return Slots.defaultProps.slots[randomOption];
	};

	render() {
		return (
			<div
				className="SlotMachine"
				style={{
					marginRight: "auto",
					marginLeft: "auto",
				}}
			>
				<div className="slot">
					<section>
						<div className="container" ref={this.slotRef[0]}>
							{Slots.defaultProps.slots.map((slot, i) => (
								<div key={i}>
									<span>{slot}</span>
								</div>
							))}
						</div>
					</section>
				</div>
				<div className="slot">
					<section>
						<div className="container" ref={this.slotRef[1]}>
							{Slots.defaultProps.slots.map((slot) => (
								<div>
									<span>{slot}</span>
								</div>
							))}
						</div>
					</section>
				</div>
				<div className="slot">
					<section>
						<div className="container" ref={this.slotRef[2]}>
							{Slots.defaultProps.slots.map((slot) => (
								<div>
									<span>{slot}</span>
								</div>
							))}
						</div>
					</section>
				</div>

				<Grid container direction="column" spacing={2}>
					<Grid item>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							onClick={
								!this.state.rolling && (() => this.roll(0))
							}
							disabled={
								this.props.isGameOver || this.state.rolling
							}
						>
							{this.state.rolling ? "Rolling..." : "Roll (-$2)"}
						</Button>
					</Grid>
					<Grid item>
						<Button
							onClick={
								!this.state.rolling && (() => this.roll(1))
							}
							fullWidth
							variant="contained"
							disabled={this.state.rolling}
						>
							Debug (♠ ♠ ♠)
						</Button>
					</Grid>
					<Grid item>
						<Button
							fullWidth
							variant="contained"
							color="secondary"
							disabled={this.state.rolling}
							onClick={this.props.close}
						>
							Close
						</Button>
					</Grid>
				</Grid>

				{/* </div> */}
			</div>
		);
	}
}
