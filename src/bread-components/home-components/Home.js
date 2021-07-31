import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';

//화살표
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//메인 썸네일
import ThumbNail from './ThumbNail';

//썸네일용샘플 데이터
import sampleSource from '../data/SampleData';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	thumNailBox: {
		justifyContent: 'center',
		[theme.breakpoints.up('lg')]: {
			display: 'flex',
			flexFlow: 'wrap',
		},
	},
}));


const Home = () => {

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container >
				<Hidden xsDown>
					<Grid item sm={1} md={1} lg={1}>

					</Grid>
				</Hidden>

				<Grid item xs={12} sm={10} md={10} lg={10}>
					<Paper className={classes.paper}>

						<Hidden lgUp>
							<ArrowBackIosIcon />
						</Hidden>

						{/* 좋아요 top6 게시글 출력 부분 */}
						<div className={classes.thumNailBox}>
							{
								sampleSource.map(eachData => <ThumbNail thumbImage={eachData.imageData} thumbTitle={eachData.title} />
								)
							}
						</div>

						<Hidden lgUp>
							<ArrowForwardIosIcon />
						</Hidden>

					</Paper>
				</Grid>

				<Hidden xsDown>
					<Grid item sm={1} md={1} lg={1}>

					</Grid>
				</Hidden>

			</Grid>
		</div>
	);
}
export default Home;