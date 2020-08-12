//esversion: 6
/* jshint ignore:end */
/* jshint ignore:start */

import React, {useContext} from 'react';
import {RoomContext} from '../ResortContext';
import Title from './Title';

const getUnique = (items,value) => {
    //console.log(items);
    //console.log(value);
    return [...new Set(items.map(item => item[value]))];
}

function RoomsFilter({rooms}) {
    //console.log(rooms);
    const context = useContext(RoomContext);
    const {handleChange,type,capacity,breakfast,pets} = context;
    const {price,minPrice,maxPrice,minSize,maxSize} = context.state;
    let types = getUnique(rooms,'type');
    types = ['all',...types];
    types = types.map((item,index) => {
        return <option value = {item} key = {index}>{item}</option>
    });
    
    //people capacity
    let people = getUnique(rooms,'capacity');
    people = people.map((item,index)=>{
        return <option key = {index} value = {item} >{item}</option>
    })
    return (
        <section className = 'filter-container'>
            <Title title = 'search rooms' />
            <form className = 'filter-form'>
                {/* select type */}
                <div className = 'form-group'>
                    <label htmlFor = 'type'>room type</label>
                    <select name = 'type' 
                            id = 'type' 
                            value = {type} 
                            className = 'form-control' 
                            onChange = {handleChange}>
                                {types}
                    </select>
                </div>
                {/* select type */}
                {/* guests  */}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select
                    name="capacity"
                    id="capacity"
                    onChange={handleChange}
                    className="form-control"
                    value={capacity}
                    >
                    {people}
                    </select>
                </div>
                {/* end of guests */}
            </form>
        </section>
    )
}

export default RoomsFilter;