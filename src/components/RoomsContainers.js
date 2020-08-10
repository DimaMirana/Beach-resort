//esversion: 6
/* jshint ignore:end */
/* jshint ignore:start */

import React from 'react';

import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import Loading from './Loading';

import {withRoomConsumer} from '../ResortContext';

function RoomsContainer({context}) {
    const {loading,sortedRooms,rooms} = context;

    if(loading) {
        return <Loading/>
    }
    return (
        <>
            <RoomsFilter rooms = {rooms}/>
            <RoomsList rooms = {sortedRooms}/>
        </>
    )
}

export default withRoomConsumer(RoomsContainer);
