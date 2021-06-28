import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));



const SeaWaterList = () => {

	const classes = useStyles();

	return (
		<div className={classes.root}>

			<List aria-label="main mailbox folders">
				<ListItem >

					<ListItemText primary="Inbox" />
				</ListItem>

				<ListItem >

					<ListItemText primary="Drafts" />
				</ListItem>
			</List>
		</div>
	);
}
export default SeaWaterList;