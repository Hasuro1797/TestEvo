import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router'
import routes from '../helpers/routes';

const PublicRoute = (props) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if(isAuthenticated) return <Redirect to={routes.feed}/>
    return (
        <Route {...props}/> 
    )
}

export default PublicRoute;