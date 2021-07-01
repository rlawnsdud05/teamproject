import { makeStyles } from '@material-ui/core';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '36vh',
		borderBottom: '1px solid rgba(224, 224, 224)'
	},
	cell: {
		borderBottom: '1px solid rgba(224, 224, 224)',
	},

}
))

const ResponsiveTable = ({ data }) => {
	const classes = useStyles();

	return (
		<Table className={classes.root} >
			<Thead>
				<Tr>
					{Object.keys(data[0]).map((key) => (
						<Th className={classes.cell} >{key}</Th>
					))
					}
				</Tr>
			</Thead>
			<Tbody>
				{
					data.map((item) => (
						<Tr>
							{
								Object.keys(item).map((key) => (
									<Td className={classes.cell} > {item[key]}</Td>
								))
							}
						</Tr>
					))

				}


			</Tbody>
		</Table >
	);
}

export default ResponsiveTable;