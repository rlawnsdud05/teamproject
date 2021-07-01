import TablePagination from '@material-ui/core/TablePagination';
import { useDispatch, useSelector } from 'react-redux';

const TodoPagination = () => {

	//무슨형태냐 도대체? 구조분해할당이네
	//redux state가져오기 state 변경이 되면 component 업데이트
	const { totalElements, page, size } = useSelector(state => state.todo);

	//정체가 뭐냐
	console.log(totalElements);
	console.log(page);
	console.log(size);
	const dispatch = useDispatch();


	//3. 이벤트 처리 함수 목록
	//페이지가 변경될때 실행되는 함수
	const handleChangePage = (event, newPage) => {

		dispatch({ type: "FETCH_TODOLIST_PAGING", payload: { page: newPage, size: size } });

	};

	//페이지 사이즈가 변경될때 실행되는 함수
	const handleChangeRowsPerPage = (event) => {
		const newSize = parseInt(event.target.value);

		//페이지의 크기가 바뀌면 첫번째 페이지를 로딩함
		dispatch({ type: "FETCH_TODOLIST_PAGING", payload: { page: 0, size: newSize } });
	};

	return (
		<>
			<TablePagination
				component="div"
				count={totalElements}
				page={page}
				onChangePage={handleChangePage}
				rowsPerPage={size}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</>
	);

}
export default TodoPagination;