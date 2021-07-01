import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	container: {
		height: '37vh',
	},
	th: {
		fontWeight: 'bold',
	}

});

const SeaWaterTable = ({ data }) => {
	//console.log('-----------table data 체크--------------\n' + data);
	const classes = useStyles();

	return (
		<TableContainer className={classes.container} component={Paper}>
			<Table stickyHeader className={classes.table} aria-label="simple table" >
				<TableHead>
					<TableRow >
						{
							Object.keys(data[0]).map((item, index) =>

								<TableCell className={classes.th} key={index}>{item}</TableCell>

							)
						}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((item, index) => (
						<TableRow key={--index}>
							{Object.keys(item).map((key) => (
								<TableCell align="right" key={item[key] + ++index}>{item[key]}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
export default SeaWaterTable;