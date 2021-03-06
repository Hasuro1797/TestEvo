import React from "react";
import { Route, Switch } from "react-router";
import Navigator from "../components/Navigator";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import routes from "../helpers/routes";
import FeedPage from "../pages/FeedPage";
import RegisterPage from "../pages/RegisterPage";

const AppRouter = () => {
	return (
		<>
			<Navigator />
			<Switch>
				<Route exact path={routes.home} component={HomePage} />
				<PublicRoute exact path={routes.login} component={LoginPage} />
				<PublicRoute exact path={routes.register} component={RegisterPage} />
				<PrivateRoute exact path={routes.feed} component={FeedPage} />
			</Switch>
		</>
	);
};

export default AppRouter;
