import React from "react";
import { logOut } from "../redux/actions/userActions";
import styled from "styled-components";
import { Link } from "react-router-dom";
import routes from "../helpers/routes";
import { useDispatch, useSelector } from "react-redux";

const NavigatorContainer = styled.nav`
	background-color: rgb(43, 40, 40);
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Title = styled.div`
	margin-left: 20px;
	& a {
		text-decoration: none;
		color: white;
	}
`;
const Menu = styled.div`
	margin-right: 20px;
	display: flex;
	gap: 10px;
	& a {
		display: block;
		text-decoration: none;
		color: white;
		font-weight: 400;
	}
	& a:hover {
		font-weight: 700;
		transition: 0.2s ease all;
	}
	& p {
		color: white;
		cursor: pointer;
		font-weight: 400;
	}
	& p:hover {
		font-weight: 700;
		transition: 0.2s ease all;
	}
`;
const Navigator = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	return (
		<NavigatorContainer>
			<Title>
				<Link to={routes.home}>
					<h2>App de Publicaciones</h2>
				</Link>
			</Title>
			<Menu>
				{isAuthenticated ? (
					<p onClick={() => dispatch(logOut())}>Cerrar Sesión</p>
				) : (
					<>
						<Link to={routes.login}>Iniciar Sesión</Link>
						<Link to={routes.register}>Registrarse</Link>
					</>
				)}
			</Menu>
		</NavigatorContainer>
	);
};

export default Navigator;
