import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {

		[theme.breakpoints.up('lg')]: {
			backgroundColor: 'blue',
			minWidth: '50vh',
			margin: '8px',
		},

		[theme.breakpoints.down('md')]: {
			backgroundColor: 'yellow',
		},

		[theme.breakpoints.down('sm')]: {
			backgroundColor: 'green',
		},

		[theme.breakpoints.down('xs')]: {
			backgroundColor: 'red',
		},

	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
}));

const ThumbNail = ({ thumbImage, thumbTitle }) => {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;
	return (
		<Card className={classes.root}>
			<CardContent>
				<CardMedia
					className={classes.media}
					image={thumbImage}
					title="Paella dish"
				/>
				<Typography variant="body2" component="p">
					{thumbTitle}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
}
export default ThumbNail;