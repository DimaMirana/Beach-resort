//esversion: 6
/* jshint ignore:end */
/* jshint ignore:start */

import React from 'react';

import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import Loading from './Loading';

import {RoomConsumer, withRoomConsumer} from '../ResortContext';

function RoomsContainer({context}) {
    const {sortedRooms,setSortedRooms} = context;
    const {loading, rooms} = context.stateObject;
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
