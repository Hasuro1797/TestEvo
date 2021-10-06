import React from 'react';
import styled from 'styled-components';
import Feed from './Feed';

const FeedsContainer = styled.div`
    width: 50%;
    margin: 15px 0px;
    background-color: rgb(0, 0, 0,.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    padding: 15px 0px;
    
`;
const FeedNotResult = styled.div`
    width: 100%;
    background-color: #5c5c5c;
    height: 441px;
    text-align: center;
`;
const Feeds = ({feeds, userInfo }) => {
    console.log(userInfo);
    return feeds.length !== 0 ?(
        <FeedsContainer>
            {
                feeds.map(feed =>(
                    <Feed
                        key={feed.id}
                        name={userInfo.profile?.name}
                        lastName={userInfo.profile?.lastName}
                        feedId ={feed.id}
                        title={feed.title}
                        description={feed.description}
                        payment={feed.payment}
                        img={feed.img}
                        status={feed.status}
                        price={feed.price}
                    />
                ))
            }
        </FeedsContainer>
    ):(
        <FeedNotResult>
            <span>No hay publicaciones</span>
        </FeedNotResult>
    )
}

export default Feeds
