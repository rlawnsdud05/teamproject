import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
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

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`nav-tabpanel-${index}`}
			aria-labelledby={`nav-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					{children}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `nav-tab-${index}`,
		'aria-controls': `nav-tabpanel-${index}`,
	};
}

function LinkTab(props) {
	return (
		<Tab
			component="a"
			onClick={(event) => {
				event.preventDefault();
			}}
			{...props}
		/>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(rootSaga);

const Bada = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Provider store={store}>
			<div className={classes.root}>

				<AppBar position="static">
					<Tabs
						variant="fullWidth"
						value={value}
						onChange={handleChange}
						aria-label="nav tabs example"
					>
						<LinkTab label="Page One" href="/drafts" {...a11yProps(0)} />
						<LinkTab label="Page Two" href="/trash" {...a11yProps(1)} />
						<LinkTab label="Page Three" href="/spam" {...a11yProps(2)} />
					</Tabs>
				</AppBar>


				<main>
					<TabPanel value={value} index={0}>
						<Home />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<div>2번째 화면</div>
						{/* 2번째 화면  */}
					</TabPanel>
					<TabPanel value={value} index={2}>
						{/* 3번째 화면 */}
					</TabPanel>
				</main>
			</div>
		</Provider>
	);
}

export default Bada;
