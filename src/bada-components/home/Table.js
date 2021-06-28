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
	table: {
		minWidth: 650,
	},
});

const SeaWaterTable = ({ data }) => {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>해수욕장명</TableCell>
						<TableCell align="right">장구균수</TableCell>
						<TableCell align="right">대장균수</TableCell>
						<TableCell align="right">적합여부</TableCell>

					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((data) => (
						<TableRow key={data.해수욕장명}>
							<TableCell component="th" scope="row">
								{data.해수욕장명}
							</TableCell>

							<TableCell align="right">{data.장구균수}</TableCell>
							<TableCell align="right">{data.대장균수}</TableCell>
							<TableCell align="right">{data.적합여부}</TableCell>

						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
export default SeaWaterTable;