//axios = ajax 라이브러리
import axios from 'axios';

const todoApi = {

	//axios.post('url',data);
	//axios.post() return Promise 객체로 생성됨
	//.then(res => ....) 응답객체~~샬라샬라

	//ex) post한 결과값 얻기
	// const result = axios.post(...);
	// result.then(res => {
	//	console.log(res.data); 결과 데이터
	//	});
	//axios.get(url,)
	//axios.post('url',data);
	//axios.post() return Promise 객체로 생성됨
	//axios.post(`${process.env.REACT_APP_API_BASE}/todos`).then((response)=>{})
	//아래문장과 동일 todoApi.add(data);
	//add: (data) => axios.post(`${process.env.REACT_APP_API_BASE}/todos`, data).then((Response) => console.log(Response.data))
	add: (data) => axios.post(`${process.env.REACT_APP_API_BASE}/todos`, data),
	//todoApi.add(data) -> POST httpL// .....:8080/todos {"memo": "redux-saga 공부하기"}
	// 자바스크립트 object가 jason 형식으로 자동 변환


	modify: (data) => axios.put(`${process.env.REACT_APP_API_BASE}/todos/${data.id}`, data),
	remove: (id) => axios.delete(`${process.env.REACT_APP_API_BASE}/todos/${id}`),
	fetch: () => axios.get(`${process.env.REACT_APP_API_BASE}/todos`),
	fetchPaging: (page, size) => axios.get(`${process.env.REACT_APP_API_BASE}/todos/paging?page=${page}&size=${size}`),

	// fetchPaging: () => axios.get(`${process.env.REACT_APP_API_BASE}/todos/paging?page=${page}&size=${size}`),
	// remove: (id) => axios.delete(`${process.env.REACT_APP_API_BASE}/todos/${id}`),
}

export default todoApi;