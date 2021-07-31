import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import { useDispatch, useSelector } from 'react-redux';
import CommentListItem from './CommentListItem';

import CommentPagination from './CommentPagination';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},

	'@global': {
		'.MuiButton-root': {
			margin: '2px',
		},
	},
}));



const CommentList = () => {

	const classes = useStyles();
	const dispatch = useDispatch();

	const data = useSelector((state) => state.seaComment);

	//컴포넌트가 마운트 되고 dispatch함수가 생성되면 실행
	useEffect(() => {
		dispatch({ type: "FETCH_SEACOMMENT_PAGING" });
	}, [dispatch]);

	//console.log('----------list data 체크----------------\n' + experienceList);

	return (
		<div className={classes.root}>

			<List aria-label="main mailbox folders" style={{ height: "22vh", width: "100%", overflowY: "auto", }} >
				{
					data.content.map((eachComment, index) => {
						//console.log('----------------experienceList data체크-------------\n' + eachComment);
						return <CommentListItem key={index} eachComment={eachComment} />
					})
				}
				<CommentPagination />
			</List>
		</div>
	);
}
export default CommentList;