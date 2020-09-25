import React, { useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

import logo from '../../images/Logo.png';
import './Navbar.css';
import { Button, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      width: '335px',
      marginLeft: '70px',
      border: '1px solid #fff'
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));

const navItemStyle = {
  textTransform: 'capitalize',
  padding: '0 30px',
  fontFamily: 'Montserrat',
  fontSize: '16px',
  fontWidth: 'medium',
  letterSpacing: '2px'
}
const btnStyle = {
    textTransform: 'capitalize',
    color: '#000',
    background: '#F9A51A',
    padding: '7px 28px',
    marginLeft: '25px',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontWidth: 'medium',
    letterSpacing: '2px'
}

const Navbar = (props) => {
  
  const navItemColor = props.color ? props.color : 'inherit'
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const userLogged = useContext(userContext)[0]


  
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'search-account-menu';


  const mobileMenuId = 'search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
         
            
      <MenuItem>
      <Button style={navItemStyle} color="inherit">News</Button>
      </MenuItem>
      <MenuItem>
      <Button style={navItemStyle} color="inherit">Description</Button>
      </MenuItem>
      <MenuItem>
      <Button style={navItemStyle} color="inherit">Blog</Button>
      </MenuItem>
      <MenuItem>
      <Button style={navItemStyle} color="inherit">Contact</Button>
      </MenuItem>
      <MenuItem>
  {userLogged.name ? <b>{userLogged.name}</b> : 
      <Link to='/login'>
      <Button style={btnStyle} color="inherit">Login</Button>
      </Link>}
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar style={{backgroundColor:'transparent',boxShadow: 'none'}} position="static">
        <Container maxWidth="lg">
        <Toolbar style={{margin:'25px 0'}}>
          <Link to='/'>
            <img className="site-logo" src={props.logo ? props.logo : logo} alt="site-logo"/>
            </Link>  
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search your Destination..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
        
            <Button style={navItemStyle} color={navItemColor}>News</Button>
            <Button style={navItemStyle} color={navItemColor}>Description</Button>
            <Button style={navItemStyle} color={navItemColor}>Blog</Button>
            <Button style={navItemStyle} color={navItemColor}>Contact</Button>
            {userLogged.name ? <Button color={navItemColor}>{userLogged.name}</Button> : 
      <Link to='/login'>
      <Button style={btnStyle} color="inherit">Login</Button>
      </Link>}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
            
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color={navItemColor}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}

export default Navbar;