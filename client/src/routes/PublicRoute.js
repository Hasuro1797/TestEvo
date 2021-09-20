import { Redirect, Route } from 'react-router'
import useAuth from '../auth/useAuth';
import routes from '../helpers/routes';

const PublicRoute = (props) => {
    //const user = null;
    const { user } = useAuth();
    if(user) return <Redirect to={routes.feed}/>
    return (
        <Route {...props}/> 
    )
}

export default PublicRoute;