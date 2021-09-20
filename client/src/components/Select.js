import React, { useState } from 'react';
import styled from 'styled-components';
import {BsThreeDotsVertical} from 'react-icons/bs'
import useAuth from '../auth/useAuth';
import Modal from './Modal';
import Input from './Input';

const SelectContainer = styled.div`
    flex: 0.1;
    display: flex;
    justify-content: flex-end;
    padding-right: 5px;
    cursor: pointer;
    position: relative;
    z-index: 0;

`;
const Options = styled.div`
    position: absolute;
    background-color: #575757;
    border-radius: 5px;
    top: 22px;
    right: 15px;
    & p{
        padding: 5px; 
    }
    & p:hover{
        background-color: black;
        color: white;
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
    width:100%;
    max-width: 100%;
    height:130px;
    max-height: 130px;
    margin-bottom: 10px;
    & label{
        font-size: 12px;
        padding-left: 5px;
    }
    & textarea{
        width: 100%;
        height: 100%;
        border: 2px solid white;
        background-color: transparent;
        color: white;
        font-family: 'Raleway', sans-serif;
        font-size: 14px;
        border-radius: 5px;
        padding: 5px 8px;
    }
    & textarea:focus{
        border: 2px solid rgb(76, 76, 209);
        label{
            color: rgb(76, 76, 209)
        }

    }
`;
const InputCheck = styled.div`
    & label{
        margin-left: 5px;
        font-size: 12px;
    }
`;
const ButtonField = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const Boton = styled.button`
	display: block;
	padding: 10px 30px;
	border-radius: 100px;
	color: #fff;
	border: none;
	background: #1766DC;
	cursor: pointer;
	font-family: 'Roboto', sans-serif;
	font-weight: 500;
	transition: .3s ease all;
	&:hover {
		background: #0066FF;
	}
`;
const SelectField = styled.div`
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
const Select = ({ items, setShow, show, feedId }) => {
    const {user, deleteFeed, updateFeed } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState({
        title: '',
        description: '',
        price: '',
        status: '',
        payment: false,
        image: 'https://www.experimenta.es/wp-content/uploads/2020/01/abc-la-coleccion-de-lamparas-de-roberto-paoli-para-modo-luce-7.jpg',
    })
    const handleChange = (e) =>{
        if(e.target.name ==="payment"){
            setInput({
                ...input,
                payment: e.target.checked
            })
        }else{
            setInput({
                ...input,
                [e.target.name] : e.target.value
            })
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        updateFeed({...input, userId: user.user.id, feedId})
        setShowModal(!showModal);
        setInput({
            title: '',
            description: '',
            price: '',
            status: '',
            payment: false,
            image: 'https://www.experimenta.es/wp-content/uploads/2020/01/abc-la-coleccion-de-lamparas-de-roberto-paoli-para-modo-luce-7.jpg',
        })
    }
    const handleClick = (value) =>(e)=>{
        if(value === "eliminar"){
            deleteFeed({
                userId: user.user.id,
                feedId
            })
            setShow(false);
        }else if(value === "editar"){
            setShowModal(!showModal);
            setShow(false); 
        }

    }
    return (
        <SelectContainer>
            <BsThreeDotsVertical onClick ={() => setShow(!show)}/>
            {
                show && 
                <Options>
                    {items.map((element,index) => (
                        <p 
                            key={index}
                            onClick={handleClick(element)}
                        >
                            {element}
                        </p>
                    ))}
                </Options>
            }
            <Modal
                    state={showModal}
                    changeState={setShowModal}
                    title="Editar"
                    showHeader={true}
                    showOverlay={true}
                    modalPosition={'center'}
                    padding={'20px'}
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
                                cols= "50"
                            />
                        </TextTareaContainer>
                        <SelectField>
                            <select
                                value={input.status}
                                onChange={handleChange}
                                name="status"
                            >
                                <option hidden value>Estado</option>
                                <option value="Nuevo">Nuevo</option>
                                <option value="Usado como-nuevo">Usado - Como nuevo</option>
                                <option value="Nuevo buen-estado">Usado - Buen Estado</option>
                                <option value="Nuevo buen-estado">Usado - Buen Estado</option>
                                
                            </select>
                        </SelectField>                        
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
                            >Editar</Boton>
                        </ButtonField>
                    </Form>
				</Contain>
			</Modal>
        </SelectContainer>
    )
}

export default Select
