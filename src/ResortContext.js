//esversion: 6
/* jshint ignore:end */
/* jshint ignore:start */

import React, {createContext, useState, useEffect} from 'react';
import items from './data';

const RoomContext = createContext();

const RoomProvider = (props) => {
    const [state, setState] = useState({
        rooms:[],
        featuredRooms:[],
        loading:true,
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    });
    const[sortedRooms, setSortedRooms] = useState([]);
    const [type, setType] = useState('all');
    const [capacity, setCapacity] = useState(1);
    const [breakfast, setBreakfast] = useState(false);
    const [pets, setPets] = useState(false);
    const [count,setCount] = useState(false);
    useEffect(()=>{
        let rooms = formatData(items);
        let room = [...rooms];
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));
        setState({
            rooms,
            featuredRooms,
            loading:false,
            maxPrice,
            maxSize
        });
        setSortedRooms(state.rooms);
    },[]);
    
    useEffect(()=>{
        filterRooms();
        setCount(false);
        //console.log(count);
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
        let tempRooms = [...state.rooms];
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
            setCapacity(value);
            setCount(true);
        }
    }
    
    const filterRooms = () => {
        const {rooms, minSize,maxSize} = state;
        
        let tempRooms = [...rooms];
        //console.log(tempRooms);
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type);
        }
        setSortedRooms(tempRooms);
    }
    
    return (
        <RoomContext.Provider value = {{state,getRoom,handleChange,filterRooms,sortedRooms,type,capacity,breakfast,pets,setSortedRooms}}>
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

