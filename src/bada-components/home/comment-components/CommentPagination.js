import { useState } from "react";
import TablePagination from '@material-ui/core/TablePagination';
import { useDispatch, useSelector } from "react-redux";

const CommentPagination = () => {

	const { totalElements, page, size } = useSelector(state => state.seaComment);
	const dispatch = useDispatch();

	//페이지가 변경될 때 실행되는 함수
	const handleChangePage = (event, newPage) => {
		//new Page 매개변수에 변동된 페이지 변수가 들어온다.
		dispatch({
			type: "FETCH_SEACOMMENT_PAGING",
			payload: { page: newPage, size },
		});
	};

	//페이지 크기가 변경될 때 실행되는 함수
	const handleChangeRowsPerPage = (event) => {
		const newSize = parseInt(event.target.value);

		//페이지 크기가 변경되면 첫번째 페이지 로딩
		dispatch({
			type: "FETCH_SEACOMMENT_PAGING",
			payload: { page: 0, size: newSize },
		});
	};

	return (
		<TablePagination
			component="div"
			count={totalElements}
			page={page}
			onChangePage={handleChangePage}
			rowsPerPage={size}
			onChangeRowsPerPage={handleChangeRowsPerPage}
		/>
	);
}

export default CommentPagination;