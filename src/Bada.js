import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

//components
import Home from './bada-components/home/Home';


//redux 관련
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas'

//abb bar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(rootSaga);

const Bada = () => {

	const classes = useStyles();

	return (
		<Provider store={store}>
			<div className={classes.root}>
				<header>
					<AppBar position="static">
						<Toolbar>
							<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" className={classes.title}>
								Bada
							</Typography>

						</Toolbar>
					</AppBar>
				</header>
				<main className={classes.content}>
					<Home />
				</main>

			</div>
		</Provider>
	);
}

export default Bada;
