// 리듀서들을 결합하는 rootReducer을 생성

import { combineReducers } from 'redux';
import todo from './todo-paging'; //하위 reducer을 import
import contact from './contact';
import seaComment from './sea-comment-paging';

// combineReducers같은 애들을 뭐라 부를까? 함수? 모듈?
const rootReducer = combineReducers(
	{
		// todo : todo => todo  키와 값의 이름이 동일하면 형시없이 이름만 적어주면 된다.
		//todo: -> todo state를 처리하겠다. : todo -> todo리듀서로 처리하겠다.
		todo: todo,
		contact: contact,
		seaComment,
	}
);

export default rootReducer;