import { Redirect, Route, useLocation } from 'react-router';
import useAuth from '../auth/useAuth';
import routes from '../helpers/routes';

const PrivateRoute = (props) => {
    const location = useLocation();
    const { user } = useAuth();
    if(!user) return <Redirect to={{ pathname: routes.login, state: { from: location } }}/>
    return (
        <Route {...props}/> 
    )
}

export default PrivateRoute
