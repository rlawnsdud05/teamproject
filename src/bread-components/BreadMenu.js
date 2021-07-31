import { Link, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { composeClasses } from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
	naviMenu: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			justifyContent: 'flex-start',
		},

	},
	menuItem: {
		marginLeft: '10px',
		color: '#2ea6b0',
	},


}));

const BreadMenu = () => {

	const classes = useStyles();

	const menu = [
		{ menuName: 'Home', menuLink: '/' },
		{ menuName: 'Search', menuLink: '/' },
		{ menuName: 'Comunity', menuLink: '/' },
		{ menuName: '1:1 Q&A', menuLink: '/' },
		{ menuName: 'Contact Us', menuLink: '/' }];

	return (

		<List component="nav" className={classes.naviMenu}>
			{
				menu.map((menuItem) => (
					<Link to="">
						<ListItem className={classes.menuItem} button>
							<ListItemText >{menuItem}</ListItemText>
						</ListItem>
					</Link>
				)
				)
			}
		</List>

	);
}

export default BreadMenu;