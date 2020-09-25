import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import GoogleMap from './GoogleMap';
import { useParams } from 'react-router-dom';
import './Location.css';
import image1 from '../../images/Rectangle26.png';
import image2 from '../../images/Rectangle27.png';
import image3 from '../../images/Rectangle28.png';
import Card from './Card';



const Location = () => {

  // get id by url
  const {id} = useParams()  

  // set and get slider data state
  const [sliderData, setSliderData] = useState()

  // set and get slider current data state
  const [ currentData , setCurrentData] = useState()


useEffect(() => {

  // change title
  document.title = 'Taravel Guru | Location'
  
  // fetch slider data
  fetch('https://mehidi-me.github.io/travel-guru-api/slider-data.json')
  .then(res => res.json())
  .then(data => setSliderData(data))
  .catch((er => console.log(er)))


  if(sliderData){
   
    let getCurrentData = sliderData.filter(v => v.id == id)[0]
    setCurrentData(getCurrentData)

  }

},[sliderData,id, currentData])
    
// return location component
    return (
        <div>
            <Container maxWidth="lg">
          <Grid container spacing={0}>
            
    
          <Grid item lg={7} xs={12}>

            <div className="heading">
              <p>252 stays Apr 13-17 3 guests</p>
              <h4>Stay in {currentData ? currentData.title : 'loading'}</h4>
            </div>

          <Card image={image1} title="Light bright airy stylish apt & safe 
peaceful stay"/>
          <Card image={image2} title="Apartment in Lost Panorama"/>
          <Card image={image3} title="AR Lounge & Pool (r&r + b&b)"/>


          </Grid>
    
    
    
            <Grid item lg={5} xs={12}>
                
                {
                  currentData && <GoogleMap location={currentData.location}></GoogleMap>
                }
            </Grid>
    
            
    
          </Grid>
          </Container>
         </div>
      );
};

export default Location;