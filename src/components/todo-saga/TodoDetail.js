import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router';

const TodoDetail = () => {

	const history = useHistory();

	// parameter 전체 객체에서 매개변수를 받을 때
	// const {매개변수명1, 매개변수명2} = useParams(); Parameter을 사용하겠다.
	// useParams으로 오는 매개변수는 무조건 문자열임
	const { id } = useParams();

	//filter함수는 항상 리턴값이 배열로 나옴 *
	// strit eauals(===)로 비교하려면 타입을 맞춰야함 ==은 문자를 숫자로 바꿔줌
	//const todo = list.filter((todo) => todo.id === parseInt(id))[0];
	const todoList = useSelector(state => state.todo);
	const todo = todoList.filter(todo => todo.id === parseInt(id));

	console.log(todo);

	return (
		<>
			<h1>Todo Detail: {id}</h1>
			<p>dddd{todo.memo}</p>
			<div>
				<button
					onClick={() => {
						//경로마다 기록을 다 남김
						//history.push("/todo");

						//goBack(goBack할 단계); 아래는 1단계 뒤로간다.
						//history.goBack('-1');

						//replce(덮어씌울 경로) : 현재 경로를 새로운 경로로 덮어씌움
						history.replace('/todo');
					}}
				>
					목록
				</button>
			</div>
		</>
	);
}

export default TodoDetail;