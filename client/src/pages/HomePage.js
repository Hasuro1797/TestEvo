import React from 'react'
import styled from 'styled-components';

const HomeContainer = styled.div`
    height: calc(100vh - 60px);
    background-image: url(https://www.uu.nl/sites/default/files/styles/image_1600xn/public/geel_plat_0.jpg?itok=hfPY8ev4);
    background-position-x: center;
    display: flex; 
    justify-content: center;
    align-items: center;
    & p{
        font-size: 80px;
        font-weight: 700;
        color: white;
        text-shadow: black 0.1em 0.1em 0.2em;
    }

`;
const HomePage = () => {
    return (
        <HomeContainer>
            <p>Publicaciones</p>
        </HomeContainer>
    )
}

export default HomePage
