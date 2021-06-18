import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ContactForm from "./ContactForm";
import ContactTable from "./ContactTable";

//style 주는 함수 <style> 태그 역할
const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.up("lg")]: {
			marginTop: "80px",
		},
		container: {

		}

	},

}));

const Contact = () => {

	const classes = useStyles();

	return (

		<div className={classes.root}>
			<Grid container spacing={3} className={classes.container}>
				{/*Hidden엘리먼트에 xsDown 속성을 주면 뷰포인트가 xs이하이면 자식 엘리먼트가 사라짐 */}

				{/* 빈 공백 grid */}
				<Grid item md={1} lg={3}></Grid>

				{/* 컨텐츠 위치 */}
				<Grid item sm={12} md={10} lg={7}>

					<Paper />
					<Paper className={classes.paper}>

						{/* Form 위치 */}

						<ContactForm />
						<ContactTable />

					</Paper>
				</Grid>
				{/* 빈 공백 grid */}
				<Grid item md={1} lg={2}></Grid>

			</Grid>
		</div>


	);

}
export default Contact;