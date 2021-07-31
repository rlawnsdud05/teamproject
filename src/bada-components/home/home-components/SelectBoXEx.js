import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const SelectBoxEx = (props) => {

	const classes = useStyles();
	//const [value, setValue] = React.useState('');

	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		//props.getSelectedValue => props = {getSelectedValue : getSelectedValue(selectedValue)}
		setAge(event.target.value);
		props.getSelectedValue(age);

	};
	//선택된 값을 부모 컴포넌트로 보내는 함수
	const sendSelectedValue = (event) => {
		//현재 선택된 값

	}

	return (
		<FormControl className={classes.formControl}>
			<InputLabel id="demo-simple-select-label">Age</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={age}
				onChange={handleChange}
			>
				<MenuItem value={10}>Ten</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem>
			</Select>
		</FormControl>
	);
}

export default SelectBoxEx;