//esversion: 6
/* jshint ignore:end */
/* jshint ignore:start */

import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';

import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';

import StyledHero from '../components/StyledHero';

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
  const [mainImg, ...defaultImg] = images;
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
    <>
    <StyledHero img = {mainImg || object.defaultBcg}>
      <Banner title = {`${name} room`}>
        <Link to = '/rooms' className = 'btn-primary'>
          back to rooms
        </Link>
      </Banner>
    </StyledHero>
    <section className = "single-room">
      <div className = 'single-room-images'>
        {defaultImg.map((item,index)=>{
          return <img key = {index} src = {item} alt = {name}/>
        })}
      </div>
      <div className = 'single-room-info'>
        <article className = 'desc'>
          <h3>details</h3>
          <p>{description}</p>
        </article>
        <article className = 'info'>
          <h3>info</h3>
          <h6>price : ${price}</h6>
          <h6>size: {size} SQFT</h6>  
          <h6>
            max capacity : {" " + capacity > 1 ? `${capacity} people` : `${capacity} person`}
          </h6>
          <h6>{pets ? "pets allowed":"no pets allowed"}</h6>
          <h6>{breakfast && 'free breakfast incuded'}</h6>
        </article>
      </div>
    </section>
    <section className = "room-extras">
      <h6>extras</h6>
      <ul className = 'extras'>
        {extras.map((item,index)=>{
          return <li key = {index}>- {item}</li>
        })}
      </ul>
    </section>
    </>
  )
}

export default SingleRoom;
