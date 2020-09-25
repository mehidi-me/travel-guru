import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './Location.css';

const GoogleMap = (props) => {
    
    return (
        <div className='mapRoot'>
        <Map
        google={props.google}
        className='mapStyles'
        zoom={11}
        initialCenter={props.location}
      />
      </div>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCs77GckjxOGoWGUY8Q0GTeSX5UaHYWtUM'
  })(GoogleMap);