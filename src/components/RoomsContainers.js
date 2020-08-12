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
    //console.log(sortedRooms);
    const {loading, rooms} = context.state;
    //console.log(rooms);
    if (sortedRooms.length === 0) {
        setSortedRooms(rooms);
    }
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
