import React from "react";
import styled from "styled-components";
import { Formik, Form, ErrorMessage } from "formik";
import Input from "../components/Input";
import routes from "../helpers/routes";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { registerUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";

const LogInContainer = styled.div`
	height: calc(100vh - 60px);
	background-image: url(https://www.uu.nl/sites/default/files/styles/image_1600xn/public/geel_plat_0.jpg?itok=hfPY8ev4);
	background-position-x: center;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const FormStyle = styled(Form)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 30%;
	max-height: 500px;
	background-color: rgb(43, 40, 40, 0.9);
	border-radius: 10px;
	padding: 15px;

	& h2 {
		color: white;
		margin-bottom: 10px;
	}
`;
const TextError = styled.div`
	width: 70%;
	color: #c55656;
	font-size: 12px;
	font-weight: 500;
`;
const ErrorLogIn = styled.p`
	width: 100%;
	background-color: #c55656;
	color: white;
	display: flex;
	justify-content: center;
`;
const MessageRegister = styled.div`
	color: white;
	& a {
		color: blue;
	}
`;

const RegisterPage = () => {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	return (
		<LogInContainer>
			<Formik
				initialValues={{
					name: "",
					lastName: "",
					email: "",
					password: "",
				}}
				validate={(input) => {
					let errors = {};
					if (!input.email) {
						errors.email = "El correo electronico es requerido";
					} else if (
						!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
							input.email
						)
					) {
						errors.email = "Debe ser un correo valido";
					}
					if (!input.password) {
						errors.password = "El password es requerido";
					}
					if (!input.name) {
						errors.name = "El nombre es requerido";
					}
					if (!input.lastName) {
						errors.lastName = "Los apellidos son requeridos.";
					}
					return errors;
				}}
				onSubmit={(valores, { setSubmitting }) => {
					dispatch(registerUser(valores));
					if (location.state?.from) history.push(location.state?.from);
					setTimeout(() => {
						setSubmitting(false);
					}, 400);
				}}
			>
				{({
					errors,
					values,
					handleSubmit,
					handleChange,
					handleBlur,
					isSubmitting,
				}) => (
					<FormStyle onSubmit={handleSubmit}>
						<h2>Registrarse</h2>
						<Input
							label="Nombre(s)"
							type="text"
							name="name"
							handleChange={handleChange}
							onBlur={handleBlur}
							value={values.name}
						/>
						<TextError>
							<ErrorMessage
								name="name"
								component={() => <p>{errors.name}</p>}
							/>
						</TextError>
						<Input
							label="Apellidos"
							type="text"
							name="lastName"
							handleChange={handleChange}
							onBlur={handleBlur}
							value={values.lastName}
						/>
						<TextError>
							<ErrorMessage
								name="lastName"
								component={() => <p>{errors.lastName}</p>}
							/>
						</TextError>
						<Input
							label="Correo Electronico"
							type="email"
							name="email"
							handleChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
						/>
						<TextError>
							<ErrorMessage
								name="email"
								component={() => <p>{errors.email}</p>}
							/>
						</TextError>
						<Input
							label="Contraseña"
							type="password"
							name="password"
							handleChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
						/>
						<TextError>
							<ErrorMessage
								name="password"
								component={() => <p>{errors.password}</p>}
							/>
						</TextError>
						<MessageRegister>
							<span>¿Ya tienes cuenta? </span>
							<Link to={routes.login}>
								<span> Iniciar Sesión</span>
							</Link>
						</MessageRegister>
						<Button text="Registrarse" isSubmitting={isSubmitting} />
						{/* {
                            (errorAuth) ? 
                                <ErrorLogIn>
                                    Correo o Contraseña invalido
                                </ErrorLogIn>
                                :null
                        } */}
					</FormStyle>
				)}
			</Formik>
		</LogInContainer>
	);
};

export default RegisterPage;
