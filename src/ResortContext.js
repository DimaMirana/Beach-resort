import React, {createContext, useState, useEffect} from 'react';
import items from './data';

const RoomContext = createContext();

const RoomProvider = (props) => {
    const [state, setState] = useState({
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading:true
    });
    // const [rooms,setRooms] = useState([]);
    // const[sortedRooms, setSortedRooms] = useState([]);
    // const [featuredRooms, setFeaturedRooms] = useState([]);
    // const [loading, setLoading] = useState(true);
     
    useEffect(()=>{
        let rooms = formatData(items);
        //console.log(rooms);
        let featuredRooms = rooms.filter(room => room.featured === true);
        setState({
            rooms,
            featuredRooms,
            sortedRooms:rooms,
            loading:false
        })
    },[]);
    
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
    
    return (
        <RoomContext.Provider value = {{state,getRoom}}>
            {props.children}
        </RoomContext.Provider>
    )
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext};
