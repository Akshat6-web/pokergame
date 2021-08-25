import "./App.css";
import Navbar from "./components/navbar";
import rootReducer from "./store/reducers";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import Game from "./components/slots";
import { Container, Grid } from "@material-ui/core";
import UserInfo from "./components/userInfo";
import HistoryTable from "./components/historyTable";
import Footer from "./components/footer";

const persistConfig = {
	key: "root",
	storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
	reducer: persistedReducer,
});
let persistor = persistStore(store);

function App() {
	//TODO : add useEffect to detect and show pop up for game over
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<div style={{ backgroundColor: "lightgrey", minHeight: 400 }}>
					<Navbar />
					<Container>
						<div style={{ display: "flex" }}>
							{" "}
							<Grid container>
								<Grid item sm={6}>
									<div style={{ width: "100%" }}>
										<UserInfo />
									</div>
								</Grid>
								<Grid item sm={6}>
									{" "}
									<div
										style={{
											width: "100%",
											display: "flex",
										}}
									>
										<Game />
									</div>
								</Grid>
							</Grid>
						</div>
						<br />

						<HistoryTable />
					</Container>
					<Footer />
				</div>{" "}
			</PersistGate>
		</Provider>
	);
}

export default App;
