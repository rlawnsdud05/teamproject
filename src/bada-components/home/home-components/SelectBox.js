//selectBox
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormHelperText } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const SelectBox = ({ subjectItem, subject, getValue }) => {

	const classes = useStyles();
	const [selectedValue, setSelectedValue] = useState('');
	const handleChange = (event) => {
		setSelectedValue(event.target.value);
	};

	return (
		<FormControl className={classes.formControl}>
			<InputLabel id="demo-simple-select-label">{subject}</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={selectedValue}
				onChange={handleChange}
			>
				{
					subjectItem.map((item, index) =>
						<MenuItem value={item} key={item + index}>{item}</MenuItem>
					)

				}
			</Select>
		</FormControl>

	);
}

export default SelectBox;