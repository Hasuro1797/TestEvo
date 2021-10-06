/* eslint-disable react-hooks/exhaustive-deps */
import AppRouter from "./routes/AppRouter";
import { loadUser } from "./redux/actions/userActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
	const token = localStorage.getItem("token");
	const dispatch = useDispatch();
	useEffect(() => {
		if (token) dispatch(loadUser());
	}, []);
	return (
		<div>
			<AppRouter />
		</div>
	);
}

export default App;
