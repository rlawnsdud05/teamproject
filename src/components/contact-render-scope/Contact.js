import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ContactContainer from './ContactContainer'; 

//style 주는 함수 <style> 태그 역할
const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.up("lg")]: {
      marginTop: "80px",
	},
},

}));

const Contact = () => {

	const classes = useStyles();

	return (

		<div className={classes.root}>
			<Grid container spacing={3}>
				{/* 빈 공백 grid */}
				<Grid item md={1} lg={3}></Grid>
				
				{/* 컨텐츠 위치 */}
				<Grid item sm={12} md={10} lg={7}>
				
      <Paper />
					<Paper className={classes.paper}>
						
					{/* Form 위치 */}
					
					<ContactContainer/>
					
						
					</Paper>
				</Grid>
				{/* 빈 공백 grid */}
				<Grid item md={1} lg={2}></Grid>

			</Grid>
		</div>


	);

}
export default Contact;