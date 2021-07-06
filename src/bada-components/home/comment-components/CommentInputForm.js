import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '5px',
		marginBottom: '5px',
	},
}
))

const CommentInputForm = () => {

	const classes = useStyles();

	const inputComment = useRef();
	const dispatch = useDispatch();

	const add = () => {
		// console.log(experienceReview.current.value);
		// console.log(phone.current.value);
		dispatch({
			type: 'ADD_SEAWATER_COMMENT',
			payload: { comment: inputComment.current.value }
		});

		inputComment.current.value = '';
	}

	const change = (event) => {
		if (event.charCode === 13) {
			add();
		}
	}


	return (
		<form className={classes.root}>
			<TextField required size="small" variant="outlined" placeholder="특이사항" onKeyPress={change} inputRef={inputComment} style={{ width: '80%' }} />
			<Button variant="contained" onClick={add} style={{ backgroundColor: 'rgb(145, 122, 255)' }}>입력</Button>
		</form>
	);
}
export default CommentInputForm;