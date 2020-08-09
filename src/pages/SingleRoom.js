import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';

import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';

import {RoomContext} from '../ResortContext';

const SingleRoom = (props) => {
  //console.log(props); -> react router props
  
  const {state,getRoom} = useContext(RoomContext);
  
  const [object, setObject] = useState({
    slug: props.match.params.slug,
    defaultBcg
  });
  const room = getRoom(object.slug);
  const {name, description,capacity,size,price,extras,breakfast,pets,images} = room;
  if(!room) {
    return (
      <div className = "error">
        <h3>no such room could be found...</h3>
        <Link to = '/rooms' className = "btn-primary">
          back to rooms
        </Link>
    </div>
    )
    
  }
  return (
    <Hero hero = 'roomsHero'>
      <Banner title = {`${name} room`}>
        <Link to = '/rooms' className = 'btn-primary'>
          back to rooms
        </Link>
      </Banner>
    </Hero>
  )
}

export default SingleRoom;
