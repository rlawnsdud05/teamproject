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
	const inputPhone = useRef();
	const dispatch = useDispatch();

	const add = () => {
		// console.log(experienceReview.current.value);
		// console.log(phone.current.value);
		dispatch({
			type: 'ADD_SEAWATER_COMMENT',
			payload: { comment: inputComment.current.value, phone: inputPhone.current.value }
		});

		inputComment.current.value = '';
		inputPhone.current.value = '';

	}


	return (
		<form className={classes.root}>
			<TextField required size="small" variant="outlined" placeholder="사용자 경험" style={{ width: '65%' }} inputRef={inputComment} />
			<TextField required size="small" variant="outlined" placeholder="-없이 전화번호 입력" style={{ width: '23%' }} inputRef={inputPhone} />
			<Button variant="contained" onClick={add} style={{ backgroundColor: 'rgb(145, 122, 255)' }}>입력</Button>
		</form>
	);
}
export default CommentInputForm;