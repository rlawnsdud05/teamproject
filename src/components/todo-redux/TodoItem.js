import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Check } from "@material-ui/icons";
import { useRef, useState } from "react";

import {useHistory} from 'react-router';
import { useDispatch } from "react-redux";

const TodoItem = ({ index, todo}) => {
	const [isEdit, setIsEdit] = useState(todo.isEdit);
	const history = useHistory(); //useHistory() -> 코드적인방법으로 경로제어(코드를 이용하여 경로제어를 할 수 있음) <> 선언하는 방법으로 경로제어(Link 컴포넌트는 선언을 해서 이동한 것)
	const dispatch = useDispatch();
	const inputRef = useRef();

	const remove = (id) => {
		dispatch({type: "REMOVE_TODO", payload: id});
	}

	const save = (id) => {
		const memo = inputRef.current.value;
		dispatch({type: "SAVE_TODO", payload: {id, memo}});
	}

	


	return (
		<ListItem>
			<ListItemIcon
				onClick={() => {
					remove(todo.id);
				}}
			>
				<Check />
			</ListItemIcon>									{/* css in js */}
																			{/* 화면 요소에 마우스 올렸을때 커서 모양이 손가락으로 변경됨 */}
			{!isEdit && <ListItemText style={{cursor:"pointer"}} onClick={()=>{ history.push(`/todo/${todo.id}`)}} >{todo.memo}</ListItemText>}
																																				{/*history.push('경로명') : history stack에 경로 추가 */}
			{!isEdit && (
				<Button
					onClick={() => {
						setIsEdit(true);
					}}
				>
					edit
				</Button>
			)}
			{isEdit && (
				<ListItemText>
					<TextField
						className="TextField 컴포넌트에 className 줬을 때 적용되는 태그"
						type="text"
						/* 어느 상황에서 속성값에 {}를 줘야하는가? */
						inputRef={inputRef}
						defaultValue={todo.memo}
						style={{ width: "100%" }}
					></TextField>
				</ListItemText>
			)}
			{isEdit && (
				<Button
					onClick={() => {
						save(todo.id);
						setIsEdit(false);
					}}
				>
					save
				</Button>
			)}
			{isEdit && (
				<Button
					onClick={() => {
						setIsEdit(false);
					}}
				>
					cancel
				</Button>
			)}
		</ListItem>
	);
};

export default TodoItem;
