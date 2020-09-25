import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import './BookingForm.css';
import { useHistory, useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';

// start material ui useStyles
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
  },
  gridRoot: {
    padding: '10px 0',
    [theme.breakpoints.up('lg')]: {
        padding: '100px 0'
      }
  },
  root: {
    textAlign:'center',
    [theme.breakpoints.up('lg')]: {
        textAlign: 'inherit'
      }
  },
  h1: {
    color: '#fff',
    fontFamily: 'Bebas Neue',
    marginBottom: '0',
    fontSize: '4rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: '6rem'
    }
  },
  body1: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontWidth: 'medium',
    marginBottom: '3rem',
    marginRight: '2rem',
    marginLeft: '2rem',
    [theme.breakpoints.up('lg')]: {
      marginLeft: '0'
    }
  }


}));
// end material ui useStyles




const BookingForm = () => {

  // get id by url
  const {id} = useParams()  

  // history hook
  let his = useHistory()  

  // set and get siderData
  const [sliderData, setSliderData] = useState()

  // set and get slider currentData
  const [ currentData , setCurrentData] = useState()
  
  
  useEffect(() => {
  
    // change title
    document.title = 'Taravel Guru | Booking From'
    
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



  // form onsubmit event
  const formHendaler = (e) => {
  e.preventDefault()
  his.push(`/location/${id}`)
  } 


  const classes = useStyles();



  // buttoun style
  const btnStyle = {
    textTransform: 'capitalize',
    color: '#000',
    background: '#F9A51A',
    padding: '15px 12px',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontWidth: 'medium',
    letterSpacing: '2px',
    cursor: 'pointer'
}

// return bookingForm component
  return (
    <div className={classes.gridRoot}>
        <Container maxWidth="lg">
      <Grid container spacing={0}>
        

      <Grid item lg={6} xs={12}>
      <div className={classes.root}>
      <Typography className={classes.h1} variant="h1" component="h2" gutterBottom>
      {currentData ? currentData.title : 'loading'}
      </Typography>
      <Typography className={classes.body1} variant="body1" gutterBottom>
      {currentData ? currentData.description : 'loading'}
      </Typography>
    </div>
        </Grid>



        <Grid item lg={6} xs={12}>
        <div className="form-box">
            <form onSubmit={formHendaler}>

                <label htmlFor="origin">Origin</label>
                <input type="text" id="origin" defaultValue="Dhaka"/>

                <label htmlFor="destination">Destination</label>
                <input type="text" id="destination" defaultValue={currentData ? currentData.title : ''}/>

                <Grid container spacing={1}>
                    <Grid item lg={6} xs={12}>
                        <label htmlFor="form">Form</label>
                        <input type="date" id="form" />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <label htmlFor="to">To</label>
                        <input type="date" defaultValue="9/21" id="to" />
                    </Grid>
                </Grid>

                <input style={btnStyle} type="submit" value="Start Booking"/>
            </form>
        </div>
        </Grid>

        

      </Grid>
      </Container>
     </div>
  );
}

export default BookingForm;