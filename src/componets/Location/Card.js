import { Container, Grid } from '@material-ui/core';
import React from 'react';
import icon from '../../images/star_1_.png';
import './Location.css';

const Card = (porps) => {
    return (
        <>
            <div className="card">
            <Container maxWidth="lg">
              <Grid container spacing={2}>
            
    
                <Grid item lg={6} xs={12}>
                  <div className="image">
                    <img src={porps.image} alt="Rectangle26"/>
                  </div>
                </Grid>
    
    
    
                <Grid item lg={6} xs={12}>
                  <div className="content">
                    <h5>{porps.title}</h5>
                    <p>4 guests   2 bedrooms   2 beds   2 baths</p>
                    <p>Wif Air conditioning Kitchen</p>
                    <p>Cancellation fexibility availiable</p>
                    <div className="icon">
                      <img src={icon} alt="icon"/>
                    </div>
                    <span>4.9 (20)</span>
                    <span>$34/night  $167 total</span>
                  </div>
                </Grid>
    
              </Grid>
            </Container>
          </div>
        </>
    );
};

export default Card;