//esversion: 6
/* jshint ignore:end */
/* jshint ignore:start */

import React from 'react';
import Room from './Room';

function RoomsList({rooms}) {
    //console.log(rooms);
    if(rooms.length === 0) {
        return (
            <div className = 'empty-search'>
                <h3>unfortunately no rooms matches your search parameter</h3>
            </div>
        )
        
    }
    return (
        <section className = 'roomsList'>
            <div className = 'roomslist-center'>
                {
                    rooms.map(item => {
                        return <Room key = {item.id} room = {item} />
                    })
                }
            </div>
        </section>
    )
}

export default RoomsList
