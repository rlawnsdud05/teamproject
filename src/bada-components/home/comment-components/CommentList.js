import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import { useDispatch, useSelector } from 'react-redux';
import CommentListItem from './CommentListItem';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
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
	const seaCommentList = useSelector((state) => state.seaComment);

	useEffect(() => {
		dispatch({
			type: "FETCH_SEAWATER_COMMENT"
		});
	}, []);

	//console.log('----------list data 체크----------------\n' + experienceList);

	return (
		<div className={classes.root}>

			<List aria-label="main mailbox folders" style={{ height: "22vh", width: "100%", overflowY: "auto" }} >
				{
					seaCommentList.map((eachComment, index) => {
						//console.log('----------------experienceList data체크-------------\n' + eachComment);
						return <CommentListItem key={index} eachComment={eachComment} />


					})

				}



			</List>
		</div>
	);
}
export default CommentList;