import React from 'react'
import useAuth from '../auth/useAuth'
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import { Formik, Form, ErrorMessage } from 'formik';

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

    & h2{
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
const LoginPage = () => {

    const location = useLocation();
    const { user, logIn, response } = useAuth();
    return (
        <LogInContainer>
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				validate={(input) => {
					let errors = {};
					if(!input.email){
						errors.email = 'El correo electronico es requerido'
					} else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.email)){
						errors.email = 'Debe ser un correo valido'
					}
                    if(!input.password){
                        errors.password = 'El password es requerido'
                    }
					return errors;
				}}
				onSubmit={(valores, {resetForm}) => {
                    logIn(valores, location.state?.from)
					resetForm();
				}}
			>
				{( {errors, values, handleSubmit, handleChange, handleBlur } ) => (
					<FormStyle
                        onSubmit={handleSubmit}
                    >
                        <h2>Iniciar Sesión</h2>
                        <Input
                            label ="Corre0 Electronico"
                            type="email"
                            name="email"
                            handleChange = {handleChange}
                            onBlur={handleBlur}
                            value ={values.email}
                        />
                        <TextError>
                            <ErrorMessage 
                                name="email" 
                                component={() => (<p>{errors.email}</p>)} 
                                />
                        </TextError>
                        <Input
                            label ="Password "
                            type="password"
                            name="password"
                            handleChange = {handleChange}
                            onBlur={handleBlur}
                            value ={values.password}
                        />
                        <TextError>
                            <ErrorMessage 
                                name="password" 
                                component={() => (<p>{errors.password}</p>)} 
                                />
                        </TextError>
                        <Button 
                            text="Iniciar Sesion"
                        />
                        {
                            ( !user && !response) ? 
                                <ErrorLogIn>
                                    Correo o Contraseña invalido
                                </ErrorLogIn>
                                :null
                        }
					</FormStyle>
				)}
			</Formik>
		</LogInContainer>
    )
}

export default LoginPage
