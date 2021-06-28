import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//components
import Home from './bada-components/home/Home';
import Todo from './components/todo-saga/Todo';
import Contact from './components/contact-saga/Contact';

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

const Bada = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
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
	);
}

export default Bada;
