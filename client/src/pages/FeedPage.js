/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../components/Button";
import Feeds from "../components/Feeds";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { addFeeds, getFeeds } from "../redux/actions/feedActions";

const FeedContainer = styled.div`
	background-color: #5c5c5c;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const FieldProfile = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 15px;
	color: white;
	text-shadow: black 0.1em 0.1em 0.2em;
`;

const FieldFeed = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	& h1 {
		text-shadow: black 0.1em 0.1em 0.2em;
	}
`;
const Boton = styled.button`
	display: block;
	padding: 10px 30px;
	border-radius: 100px;
	color: #fff;
	border: none;
	background: #1766dc;
	cursor: pointer;
	font-family: "Roboto", sans-serif;
	font-weight: 500;
	transition: 0.3s ease all;
	&:hover {
		background: #0066ff;
	}
`;

const Contain = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	h1 {
		font-size: 42px;
		font-weight: 700;
		margin-bottom: 10px;
	}
	p {
		font-size: 18px;
		margin-bottom: 20px;
	}
	img {
		width: 100%;
		vertical-align: top;
		border-radius: 3px;
	}
`;
const Form = styled.form`
	width: 90%;
`;
const TextTareaContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 100%;
	height: 130px;
	max-height: 130px;
	margin-bottom: 10px;
	& label {
		font-size: 12px;
		padding-left: 5px;
	}
	& textarea {
		width: 100%;
		height: 100%;
		border: 2px solid white;
		background-color: transparent;
		color: white;
		font-family: "Raleway", sans-serif;
		font-size: 14px;
		border-radius: 5px;
		padding: 5px 8px;
	}
	& textarea:focus {
		border: 2px solid rgb(76, 76, 209);
		label {
			color: rgb(76, 76, 209);
		}
	}
`;
const InputCheck = styled.div`
	& label {
		margin-left: 5px;
		font-size: 12px;
	}
`;
const SelectContainer = styled.div`
	margin: 5px 0px;
	& select {
		border: 2px solid white;
		color: white;
		background-color: transparent;
		height: 30px;
		border-radius: 5px;
		& option {
			background-color: black;
			border: none;
		}
	}
`;
const ButtonField = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;
const FeedPage = () => {
	const feeds = useSelector((state) => state.feeds.feeds);
	const user = useSelector((state) => state.auth.user);
	// const isLoading = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [input, setInput] = useState({
		title: "",
		description: "",
		price: "",
		status: "",
		payment: false,
		img: "https://www.experimenta.es/wp-content/uploads/2020/01/abc-la-coleccion-de-lamparas-de-roberto-paoli-para-modo-luce-7.jpg",
	});

	useEffect(() => {
		dispatch(getFeeds());
	}, []);
	const handleClick = () => {
		setShowModal(!showModal);
	};
	const handleChange = (e) => {
		if (e.target.name === "payment") {
			setInput({
				...input,
				payment: e.target.checked,
			});
		} else {
			setInput({
				...input,
				[e.target.name]: e.target.value,
			});
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addFeeds(input));
		setShowModal(!showModal);
		setInput({
			title: "",
			description: "",
			price: "",
			status: "",
			payment: false,
			img: "https://www.experimenta.es/wp-content/uploads/2020/01/abc-la-coleccion-de-lamparas-de-roberto-paoli-para-modo-luce-7.jpg",
		});
	};
	return user ? (
		<FeedContainer>
			<FieldProfile>
				<h2>{`Hola ${user.profile?.name} ${user.profile?.lastName}`}</h2>
			</FieldProfile>
			<FieldFeed>
				<h1>Mis Publicaciones</h1>
				<Button
					type="button"
					text="agregar publicacion"
					handleClick={handleClick}
				/>
				<Modal
					state={showModal}
					changeState={setShowModal}
					title="Nueva Publicación"
					showHeader={true}
					showOverlay={true}
					modalPosition={"center"}
					padding={"20px"}
				>
					<Contain>
						<Form onSubmit={handleSubmit}>
							<Input
								type="text"
								label="Titulo"
								name="title"
								value={input.title}
								handleChange={handleChange}
							/>
							<Input
								type="number"
								label="Costo"
								name="price"
								value={input.price}
								handleChange={handleChange}
							/>
							<TextTareaContainer>
								<label htmlFor="description">Descripción</label>
								<textarea
									id="description"
									value={input.description}
									name="description"
									onChange={handleChange}
									cols="50"
								/>
							</TextTareaContainer>
							<SelectContainer>
								<select
									value={input.status}
									onChange={handleChange}
									name="status"
								>
									<option hidden value>
										Estado
									</option>
									<option value="Nuevo">Nuevo</option>
									<option value="Usado como-nuevo">Usado - Como nuevo</option>
									<option value="Nuevo buen-estado">Usado - Buen Estado</option>
									<option value="Nuevo buen-estado">Usado - Buen Estado</option>
								</select>
							</SelectContainer>
							<InputCheck>
								<input
									type="checkbox"
									name="payment"
									value={input.payment}
									onChange={handleChange}
									id="payment"
								/>
								<label htmlFor="payment">Efectivo</label>
							</InputCheck>
							<ButtonField>
								<Boton
									type="submit"
									disabled={
										input.title &&
										input.description &&
										input.price &&
										input.status
											? false
											: true
									}
								>
									Crear
								</Boton>
							</ButtonField>
						</Form>
					</Contain>
				</Modal>
			</FieldFeed>
			<Feeds feeds={feeds} userInfo={user} />
		</FeedContainer>
	) : null;
};

export default FeedPage;
