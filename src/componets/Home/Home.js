import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import './Home.css';
import { Link } from 'react-router-dom';

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
    marginLeft: '0',
    textAlign:'center',
    [theme.breakpoints.up('lg')]: {
        width: '460px',
        marginLeft: 'auto',
        textAlign: 'inherit'
      }
  },
  sliderRoot: {
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
  },
  btnStyle: {
    textTransform: 'capitalize',
    color: '#000',
    background: '#F9A51A',
    '&:hover': {
        background: '#fff'
    },
    padding: '7px 28px',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontWidth: 'medium',
    letterSpacing: '2px',
    marginBottom: '30px'
}


}));
// end material ui useStyles


// slick slider nextArrow event
const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, 
        display: "block", 
        position: 'absolute',
        left: '12%',
        top: '110%'}}
        onClick={onClick}
      />
    );
  }
  
  // slick slider prevArrow event
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style,
            display: "block", 
            position: 'absolute',
            left: '6%',
            top: '110%' }}
        onClick={onClick}
      />
    );
  }


const Home = () => {

// sliderData set and get state
const [sliderData, setSliderData] = useState()

// sliderCurrentId set and get state
const [ sliderCurrentId , setSliderCurrentId] = useState(0)

// currentData set and get state
const [ currentData , setCurrentData] = useState()


useEffect(() => {

  // fetch slider data
  fetch('https://mehidi-me.github.io/travel-guru-api/slider-data.json')
  .then(res => res.json())
  .then(data => setSliderData(data))
  .catch((er => console.log(er)))


  if(sliderData){

    let getCurrentData = sliderData[sliderCurrentId]
    setCurrentData(getCurrentData)

  }

},[sliderData, sliderCurrentId, currentData])



  const classes = useStyles();

  // slick slider settings
  const settings = {
    dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    initialSlide: 0,
    afterChange: (current) => setSliderCurrentId( current ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };


  // return home component
  return (
    <div className={classes.gridRoot}>
      <Grid container spacing={0}>
        

      <Grid item lg={5} xs={12}>
      <div className={classes.root}>
      <Typography className={classes.h1} variant="h1" component="h2" gutterBottom>
      {currentData ? currentData.title : 'loading'}
      </Typography>
      <Typography className={classes.body1} variant="body1" gutterBottom>
      {currentData ? currentData.description.substr(0, 200) + '...' : 'loading'}
      </Typography>
      {currentData ?
       <Link to={`/booking-form/${currentData.id}`}>
       < Button className={classes.btnStyle} color="inherit">Booking <ArrowForwardIcon style={{fontSize:'1.25rem',marginLeft:'8px'}}></ArrowForwardIcon> </Button>
     </Link>
       : 'loading'}
      
    </div>
        </Grid>



        <Grid item lg={7} xs={12}>
        <div className={classes.sliderRoot}>
        <Slider {...settings}>
         
          {
            sliderData && sliderData.map(v => {
              return  <div key={v.id} className='slider-item'>
                <Link to={`/booking-form/${v.id}`}>
              <img className='sliderImage' src={v.image_url} alt="location"/>
            <h3 className='slider-title'>{v.title}</h3>
            </Link>
            </div>
            })
          }
        </Slider>
        </div>
        </Grid>

        

      </Grid>
     </div>
  );
}

export default Home;