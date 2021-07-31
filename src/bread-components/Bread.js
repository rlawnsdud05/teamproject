import React, { useState } from 'react';

//app bar 
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createMuiTheme, Drawer, Hidden, Link, List, ListItem, ListItemText, ThemeProvider, Toolbar } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

//로고 이미지
import logoImg from './image/LogoMakr-4e2w8E.png';

import '../bada-css/fonts.css';
import BreadMenu from './BreadMenu';
import Home from './home-components/Home';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,

	},
	appBar: {
		backgroundColor: '#FFEBC9',
		// #f0bf9e, 
	}
	,
	mainImg: {
		width: '68px',
		height: '65px',
	}
	,
	mainLogo: {
		fontFamily: 'Gaegu',
		color: '#2ea6b0',
		marginLeft: '9px',
	},
	menuItems: {

	},
	menuButton: {
		[theme.breakpoints.down('md')]: {
			flex: 1,
			justifyContent: 'flex-end',
		},
	},
	content: {
		marginTop: '2vh',
	},
}));

const Bread = () => {

	const classes = useStyles();

	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
		console.log(mobileOpen)
	}



	return (

		<div className={classes.root}>

			<AppBar position="static" className={classes.appBar} >

				<Toolbar >

					{/* main로고  */}
					<img src={logoImg} className={classes.mainImg} />
					<Typography variant="h3" className={classes.mainLogo} >빵덕빵덕</Typography>

					{/* 메뉴 */}
					<Hidden smDown>
						<BreadMenu className={classes.menuItems} />
					</Hidden>

					{/* 메뉴 토글 */}
					<Hidden mdUp>
						<IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => { setMobileOpen(!mobileOpen); }}>
							<MenuIcon />
						</IconButton>
						<Drawer
							variant='temporary'
							anchor='right'
							open={mobileOpen}
							onClose={handleDrawerToggle}
						>
							<BreadMenu className={classes.menuItems} />
						</Drawer>
					</Hidden>

				</Toolbar>

			</AppBar>

			<main className={classes.content}>
				{/* <Home /> */}

			</main>
		</div >

	);
}

export default Bread;