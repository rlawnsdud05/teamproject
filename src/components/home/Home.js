import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';
import VideoLoading from './VideoLoading';


const useStyles = makeStyles((theme) => ({
	//내부 페이퍼 스타일을 지정
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	container: {
		[theme.breakpoints.up('lg')]: {
			marginTop: '80px',
		},
	},

}));

const Home = () => {
	const classes = useStyles();

	return (
		//Grid 컨테이너 선언
		<Grid container spacing={3} className={classes.container}>
			{/* Grid 아이템 선언 lg 사이즈 이상일 때 2칸, */}
			{/* 1행 */}
			<Hidden mdDown>
				<Grid item lg={2} />
			</Hidden>
			<Grid item xs={12} sm={7} lg={5}>
				<Paper className={classes.papaer} style={{ height: '20vh' }}>

				</Paper>
			</Grid>
			<Grid item xs={12} sm={5} lg={3}>
				<Paper className={classes.papaer} style={{ height: '20vh' }}>

				</Paper>
			</Grid>
			<Hidden mdDown>
				<	Grid item lg={2} />
			</Hidden>

			{/* 2행 */}
			<Hidden mdDown>
				<Grid item lg={2} />
			</Hidden>
			<Grid item xs={12} sm={12} lg={8}>
				<Paper className={classes.paper} style={{ height: '20vh' }}>
					<VideoLoading></VideoLoading>
				</Paper>
			</Grid>
			<Hidden mdDown>
				<Grid item lg={2} />
			</Hidden>
		</Grid>
	);
}

export default Home;