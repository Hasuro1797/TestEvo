import React, { useState } from 'react';
import styled from 'styled-components';
import Select from './Select';

const FeedContainer = styled.div`
    width: 90%;
    background-color: #111111;
    padding: 10px;
    border-radius: 10px;
    margin: 15px 0px;
`;
const ProfileField = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
`;
const InfoLeft = styled.div`
    display: flex;
    align-items:center;
    flex: 0.9;
`;

const ImgProfile = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    & img{
        width: 100%;
        object-fit: contain;
        border-radius: 50%;
    }
`;
const Description = styled.div`
    padding: 15px 0px;
`;
const ImgFeed = styled.div`
    width: 100%;
    & img {
        width: 100%;
        object-fit: contain;
        border-radius: 10px;
    }
`;
const Feed = ({
    feedId,
    title,
    description,
    payment,
    img,
    status,
    name,
    lastName,
    price
}) => {
    const [show, setShow] = useState(false);
    return (
        <FeedContainer>
            <ProfileField>
                <InfoLeft>
                    <ImgProfile>
                        <img src="https://us.123rf.com/450wm/afe207/afe2071307/afe207130700242/20944560-foto-de-perfil-masculino.jpg?ver=6" alt="user-profile"/>
                    </ImgProfile>
                    <h4>{`${name} ${lastName}`}</h4>
                </InfoLeft>
                <Select
                    items = {["editar", "eliminar"]}
                    show = {show}
                    setShow ={setShow}
                    feedId={feedId}
                />
            </ProfileField>
            <div>
                <h2>
                    {title}
                </h2>
                <p>
                    {status}
                </p>
                <h5>
                    ${price}
                </h5>
                {
                    payment? <p>Efectivo</p> : <p>Transferencia</p>
                }
                <Description>
                    <p>{description}</p>
                </Description>
                <ImgFeed>
                    <img 
                        src="https://www.experimenta.es/wp-content/uploads/2020/01/abc-la-coleccion-de-lamparas-de-roberto-paoli-para-modo-luce-7.jpg"
                        alt="feed"
                    />
                </ImgFeed>
            </div>
        </FeedContainer>
    )
}

export default Feed
