//esversion: 6
/* jshint ignore:end */
/* jshint ignore:start */

import React, {createContext, useState, useEffect} from 'react';
import items from './data';

const RoomContext = createContext();

const RoomProvider = (props) => {
    const [stateObject, setStateObject] = useState({
        rooms:[],
        featuredRooms:[],
        loading:true,
        type: "all",
        minPrice: 0,
        maxPrice: 0,
    });
    const [sortedRooms, setSortedRooms] = useState([]);
    const [type, setType] = useState('all');
    const [price, setPrice] = useState(0);
    const [capacity, setCapacity] = useState(1);
    const [breakfast, setBreakfast] = useState(false);
    const [pets, setPets] = useState(false);
    const [count,setCount] = useState(false);
    useEffect(()=>{
        let rooms = formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));
        setStateObject({
            rooms,
            featuredRooms,
            loading:false,
            maxPrice,
            maxSize,
            minSize:0
        });
        setSortedRooms(rooms);
        setPrice(maxPrice);
        
    },[]);
    
    
    useEffect(()=>{
        if(count === true){
            filterRooms();
            setCount(false);
        }
    },[count])
    
    const formatData = (items) => {
        let tempItems = items.map(item=>{
            let id = item.sys.id;
            let images = item.fields.images.map(image =>image.fields.file.url);
            
            let room = {...item.fields,images,id};
            return room;
        });
        return tempItems;
    }
    
    const getRoom = (slug) => {
        let tempRooms = [...stateObject.rooms];
        const room = tempRooms.find((room) => room.slug === slug);
        return room;
    }
    
    const handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if(name === 'type'){
            setType(value);
            setCount(true);
        }
        if(name === 'capacity') {
            setCapacity(parseInt(value));
            setCount(true);
        }
        if(name === 'price'){
            setPrice(parseInt(value));
            setCount(true);
        }
        if(name === 'breakfast'){
            setBreakfast(value);
            setCount(true);
        }
        if (name === 'pets') {
            setPets(value);
            setCount(true);
        }
    }
    
    const filterRooms = () => {
        const {rooms} = stateObject;
        
        let tempRooms = [...rooms];
        //filter by type
        if(type!== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type);
        }
        
        //filter by capacity
        if(capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }
        
        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);
        
        //filter by breakfast
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }
        
        //filter by pets
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }
        setSortedRooms(tempRooms);
    }
    
    return (
        <RoomContext.Provider value = {{stateObject,getRoom,handleChange,filterRooms,sortedRooms,type,capacity,price,breakfast,pets,setSortedRooms}}>
            {props.children}
        </RoomContext.Provider>
    )
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext};

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props){
        return (<RoomConsumer>
            {value =><Component {...props} context = {value} />}
        </RoomConsumer>)
    }
}

