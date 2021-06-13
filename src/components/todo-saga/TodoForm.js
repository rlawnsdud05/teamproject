import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRef } from "react";
import { useDispatch } from "react-redux";

const TodoForm = ({ onChange, }) => {

	const inputRef = useRef();

	// store에 dispatch할 함수를 생성
	const dispatch = useDispatch();

	const add = () => {
		dispatch({ type: "ADD_TODO", payload: { memo: inputRef.current.value } });
	};

	const change = (event) => {
		// console.log(event);
		if (event.charCode === 13) {
			add();
		}
	};

	return (
		<div style={{ display: "flex" }}>
			<TextField
				className="TextField 컴포넌트에 className 줬을 때 적용되는 태그"
				variant="outlined"
				inputRef={inputRef}
				label="할 일 ..."
				onKeyPress={change}
				size="small"
				style={{
					width: "90%",
					marginRight: "0.5rem",
				}}
			/>
			<Button
				style={{ width: "10%" }}
				variant="contained"
				color="primary"
				onClick={add}
			>
				입력
      </Button>
		</div>
	);
};

export default TodoForm;
