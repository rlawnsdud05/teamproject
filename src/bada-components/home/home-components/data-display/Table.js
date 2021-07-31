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
		data.length > 0 && (
			<TableContainer className={classes.container} component={Paper}>
				<Table stickyHeader className={classes.table} aria-label="simple table" >
					<TableHead>
						<TableRow >
							{
								Object.keys(data[0]).map((seaWaterDataSubject, index) =>

									<TableCell className={classes.th} key={index}>{seaWaterDataSubject}</TableCell>

								)
							}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((seaWaterData, index) => (
							<TableRow key={index}>
								{/*seaWaterData = {
									해수욕장명: '부산',
									장구균수: 100,
									대장균수: 200,
									적합여부: '적합',
								} */}
								{
									/*seaWaterDataSubject = [해수욕장명, 장구균수,대장균수] */
									Object.keys(seaWaterData).map((seaWaterDataSubject, subIndex) =>
										<TableCell align="right" key={index + subIndex}>{seaWaterData[seaWaterDataSubject]}</TableCell>
									)
								}

							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		)
	);

}
export default SeaWaterTable;