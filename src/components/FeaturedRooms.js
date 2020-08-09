import React, {useContext} from 'react';

import Loading from './Loading';
import Room from './Room';
import Title from './Title';
import {RoomContext} from '../ResortContext'; 

function FeaturedRooms() {
    const {state} = useContext(RoomContext);
    let rooms = state.featuredRooms;
    const loading = state.loading;
    rooms = rooms.map(room => {
        return <Room key = {room.id} room = {room} />
    })
    return (
        <section className = 'featured-rooms'>
            <Title title = "featured-rooms" />
            <div className = "featured-rooms-center">
                {loading? <Loading/> : rooms}
            </div>
        </section>
    )
}

export default FeaturedRooms;
