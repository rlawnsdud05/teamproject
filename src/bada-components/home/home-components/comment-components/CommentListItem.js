import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';



const CommentListItem = ({ eachComment }) => {



	const dispatch = useDispatch();
	const inputComment = useRef();

	const [isEdit, setIsEdit] = useState();

	const remove = (id) => {
		dispatch({
			// id값으로 제어
			type: 'REMOVE_SEAWATER_COMMENT', payload: id
		});
	}

	const save = (id) => {
		//console.log('save 메서드 시작---');
		dispatch({
			type: 'MODIFY_SEAWATER_COMMENT', payload: { id: id, comment: inputComment.current.value }
		});
	}




	return (
		<ListItem divider={true} style={{ flex: "0" }}>
			{isEdit === true ? <TextField required size="small" variant="outlined" defaultValue={eachComment.comment} style={{ width: '65%' }} inputRef={inputComment} /> : eachComment.comment}

			{isEdit && <Button variant="contained" color="primary" onClick={() => { save(eachComment.id); setIsEdit(false); }} >	저장 </Button>}
			{isEdit && <Button variant="contained" color="secondary" onClick={() => { setIsEdit(false) }} >취소 </Button>}
			{!isEdit && <Button variant="contained" style={{ backgroundColor: "rgb(255, 217, 0)" }} onClick={() => { setIsEdit(true) }} >수정</Button>}
			{!isEdit && <Button variant="contained" color="secondary" onClick={() => { remove(eachComment.id) }} >삭제</Button>}

		</ListItem >
	);
}

export default CommentListItem;